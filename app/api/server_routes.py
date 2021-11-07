from flask import Blueprint, jsonify
from flask_login import login_required
# from app.models import User

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
@login_required
def get_channels(serverId):
    return "Get channels for a server"


# Add a channel to a server
@server_routes.route('/<int:serverId>/channels', methods=['POST'])
@login_required
def add_channel(serverId):
    return "Added a channel"


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
