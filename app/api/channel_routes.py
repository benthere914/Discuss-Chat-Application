from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import Channel_Message
# from app.models import User

channel_routes = Blueprint('channels', __name__)

# Update a channel name
@channel_routes.route('/<int:channelId>', methods=['PATCH'])
@login_required
def update_channel(channelId):
    return "Updated channel name"


# Delete a channel
@channel_routes.route('/<int:channelId>', methods=['DELETE'])
@login_required
def delete_channel(channelId):
    return "Deleted channel"

'''
View and add messages
'''
# Get channel messages
@channel_routes.route('/<int:channelId>/messages')
@login_required
def get_messages(channelId):
    channelMessages = Channel_Message.query.filter(Channel_Message.channel_id == channelId).all()
    messages = [message.to_dict() for message in channelMessages]
    return {"servers": messages}


# Add a message to a channel
@channel_routes.route('/<int:channelId>', methods=['POST'])
@login_required
def add_message(channelId):
    return "Added a message"
