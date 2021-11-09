from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import db, Channel
from app.forms import UpdatedChannelForm
from .auth_routes import validation_errors_to_error_messages

channel_routes = Blueprint('channels', __name__)

# Update a channel name
@channel_routes.route('/<int:channelId>', methods=['PATCH'])
@login_required
def update_channel(channelId):
    form = UpdatedChannelForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        channel = Channel.query.filter(Channel.id == form.data['channel_id']).first()
        channel.name = form.data['name']
        db.session.commit()

        return channel.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


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
    return "All messages in the channel"


# Add a message to a channel
@channel_routes.route('/<int:channelId>', methods=['POST'])
@login_required
def add_message(channelId):
    return "Added a message"
