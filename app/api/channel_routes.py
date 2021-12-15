from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.forms.new_message import NewMessageForm

from app.models import db, Channel, Channel_Message
from app.forms import UpdatedChannelForm
from .auth_routes import validation_errors_to_error_messages

import datetime

channel_routes = Blueprint('channels', __name__)

# Update a channel name
@channel_routes.route('/<int:channelId>', methods=['PATCH'])
@login_required
def update_channel(channelId):
    form = UpdatedChannelForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        print('got here')
        print('got here 2')
        channel = Channel.query.filter(Channel.id == form.data['channel_id']).first()
        channel.name = form.data['name']
        db.session.commit()

        return channel.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Delete a channel
@channel_routes.route('/<int:channelId>', methods=['DELETE'])
@login_required
def delete_channel(channelId):
    channel = Channel.query.filter(Channel.id == channelId).first()
    if channel:
        db.session.delete(channel)
        db.session.commit()
        return "Channel Deleted"

'''
View and add messages
'''
# Get channel messages
@channel_routes.route('/<int:channelId>/messages')
@login_required
def get_messages(channelId):

    channelMessages = Channel_Message.query.filter(Channel_Message.channel_id == channelId).all()
    messages = [message.to_dict() for message in channelMessages]
    return {"messages": messages}


# Add a message to a channel
@channel_routes.route('/<int:channel_id>/messages', methods=['POST'])
@login_required
def add_message(channel_id):
    form = NewMessageForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message = Channel_Message(channel_id=form.data['channel_id'],
            user_id=form.data['user_id'],
            message=form.data['message'],
            date=datetime.datetime.today()
            )
        db.session.add(message)
        db.session.commit()

        return message.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
