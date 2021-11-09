from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import Channel, db
from app.forms import NewChannelForm
from .auth_routes import validation_errors_to_error_messages


server_routes = Blueprint('servers', __name__)

# Get all servers. Maybe used for the search functionality
# (or perhaps to show a random assortment of servers on the guild-discovery page)
@server_routes.route('/')
@login_required
def all_servers():
    return "All servers"


# Update a Server name
@server_routes.route('/<int:serverId>', methods=['PATCH'])
@login_required
def update_server(serverId):
    return "Updated server name"


# Delete a Server
@server_routes.route('/<int:serverId>', methods=['DELETE'])
@login_required
def delete_servers(serverId):
    return "Delete a server"

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
# @login_required
def add_channel(serverId):
    form = NewChannelForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    print("*******************")
    print(form.data)
    print("*******************")
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
    return "Get server members"


# Add a member to a server
@server_routes.route('/<int:serverId>/members', methods=['POST'])
@login_required
def add_member(serverId):
    return "Added a member to the server"
