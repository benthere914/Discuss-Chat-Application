from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Channel, Server, Server_Member, db
from app.forms import UpdateServerForm, AddMemberForm, NewChannelForm
from .auth_routes import validation_errors_to_error_messages
import datetime
from sqlalchemy import desc

server_routes = Blueprint('servers', __name__)

# returns an ok response if the user is part of the server
@server_routes.route('/<int:server_id>/<int:user_id>')
def user_in_server(server_id, user_id):
    print(server_id, user_id)
    server_member = Server_Member.query.filter(Server_Member.server_id == server_id).filter(Server_Member.user_id == user_id).first()
    return server_member.to_dict()

# Get all servers. Maybe used for the search functionality
# (or perhaps to show a random assortment of servers on the guild-discovery page)
@server_routes.route('/')
@login_required
def all_servers():
    servers = Server.query.all()
    return {'servers': [server.to_dict() for server in servers]}


#single server
@server_routes.route('/<int:id>', methods=['GET'])
@login_required
def single_servers(id):
    servers = Server.query.get(id)
    return servers.to_dict()

#Update a Server name
@server_routes.route('/<int:serverId>', methods=['PUT'])
@login_required
def update_server(serverId):
    form = UpdateServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        #server = Server.query.filter(Server.id == form.data['server_id']).first()
         #channel = Channel.query.filter(Channel.id == form.data['channel_id']).first()
        server = Server.query.filter(Server.id == serverId).first()
        server.name = form.data['name']
        server.description = form.data['description']
        server.icon = form.data['icon']
        db.session.commit()
        return server.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Delete a Server
@server_routes.route('/<int:serverId>', methods=['DELETE'])
@login_required
def delete_servers(serverId):
    server= Server.query.filter(Server.id==serverId).first()
    if server:
        db.session.delete(server)
        db.session.commit()
        return "Deleted a server"

'''
View and add channels
'''

# Get all channels for a single server
@server_routes.route('/<int:serverId>/channels')
# @login_required
def get_channels(serverId):
    serverChannels = Channel.query.filter(Channel.server_id == serverId).all()
    channels = [channel.to_dict() for channel in serverChannels]
    return {"channels": channels}

# Get single channel for single server
@server_routes.route('/<int:serverId>/channels/<int:channelId>')
# @login_required
def get_channel(serverId, channelId):
    serverChannels = Channel.query.filter(Channel.server_id == serverId).filter(Channel.id == channelId).first()
    return serverChannels.to_dict()


# Add a channel to a server
@server_routes.route('/<int:serverId>/channels', methods=['POST'])
@login_required
def add_channel(serverId):
    form = NewChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel = Channel(name=form.data['name'],
                server_id=form.data['server_id'])
        db.session.add(channel)
        db.session.commit()
        return channel.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

'''
View and add members
'''

def in_timeframe(time1, time2):
    if 5 < time1 <= 55:
        return ((time1 - time2) <= 5)
    elif 0 < time1 <= 5:
        return (time2 >= 55 or time2 <= time1)
    elif 55 < time1 <= 60:
        return (time2 <= 5 or time2 >= time1)
    else:
        return False

# Get all members of a single server
@server_routes.route('/<int:serverId>/members')
@login_required
def get_members(serverId):
    now = datetime.datetime.now().minute
    membersServer = Server_Member.query.filter(Server_Member.server_id == serverId).all()
    print(membersServer)
    for member in membersServer:
        member = member.user
        checkin = member.last_checkIn
        if bool(now) and bool(checkin):
            member.online = in_timeframe(int(now), int(checkin))
        else:
            member.online = False
    db.session.commit()
    members = {member.to_dict()['id']: member.user.to_dict() for member in membersServer}
    # for i in range(20):
    #     print('******************')
    # for member in members:
    #     print(member)
    return members

# Add a member to a server
@server_routes.route('/<int:serverId>/members', methods=['POST'])
@login_required
def add_member(serverId):
    form = AddMemberForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # server = addMemberForm()
        server= Server_Member(user_id=form.data['user_id'],
                server_id=form.data['server_id'])
        # form.populate_obj(server)
        db.session.add(server)
        db.session.commit()
        return server.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# Remove a member from a server
@server_routes.route('/members/<int:userId>/<int:serverId>', methods=['DELETE'])
@login_required
def remove_member(userId, serverId):
        member = Server_Member.query.filter(Server_Member.user_id == userId, Server_Member.server_id == serverId).first()
        if member:
            db.session.delete(member)
            db.session.commit()
            return "Member Deleted"

# Server search
@server_routes.route('/search/<string:query>')
@login_required
def search_servers(query):
    query = query.replace('%20', ' ')
    query = query.replace('%25', '%')
    if query == '$$default$$':
        return {server.name: server.to_dict() for server in Server.query.limit(10).all()}
    else:
        return {server.name: server.to_dict() for server in Server.query.filter(Server.name.ilike(f'%{query}%'))}
