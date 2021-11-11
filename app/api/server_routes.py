from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Channel, Server, db, Server_Member
from app.forms import UpdateServerForm, addMemberForm, NewChannelForm
from .auth_routes import validation_errors_to_error_messages

server_routes = Blueprint('servers', __name__)

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
@server_routes.route('/<int:serverId>', methods=['PATCH'])
@login_required
def update_server(serverId):
    form = UpdateServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        # server = Server.query.filter(Server.id == form.data['server_id']).first()
        server = Server.query.filter(Server.id == serverId).first()
        server.name = form.data['name']
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

# Get all members of a single server
@server_routes.route('/<int:serverId>/members')
@login_required
def get_members(serverId):
    membersServer = Server_Member.query.filter(Server_Member.server_id == serverId).all()
    members = {member.to_dict()['id']: member.user.to_dict() for member in membersServer}
    for i in range(20):
        print('******************')
    print(members)
    return members


# Add a member to a server
@server_routes.route('/<int:serverId>/members', methods=['POST'])
@login_required
def add_member(serverId):
    form = addMemberForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server = addMemberForm()
        form.populate_obj(server)
        db.session.add(server)
        db.session.commit()
        return server.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


@server_routes.route('/search/<string:query>')
# @login_required
def search_servers(query):
    query = query.replace('%20', ' ')
    query = query.replace('%25', '%')
    if query == '$$default$$':
        return {server.name: server.to_dict() for server in Server.query.limit(10).all()}
    else:
        return {server.name: server.to_dict() for server in Server.query.filter(Server.name.ilike(f'{query}%'))}
