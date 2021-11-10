from flask import Blueprint, jsonify
from flask_login import login_required
from flask import Blueprint, jsonify, request
from app.forms.update_message import UpdateMessageForm
from app.models import db, Channel_Message
from app.forms import UpdatedChannelForm
from .auth_routes import validation_errors_to_error_messages
# from app.models import User

message_routes = Blueprint('messages', __name__)

# Update a message
@message_routes.route('/<int:message_id>', methods=['PATCH'])
@login_required
def update_message(message_id):
    form = UpdateMessageForm()

    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        message = Channel_Message.query.filter(Channel_Message.id == form.data['message_id']).first()
        message.message = form.data['message']
        db.session.commit()

        return message.to_dict()

    return {'errors': validation_errors_to_error_messages(form.errors)}, 401


# Delete a message
@message_routes.route('/<int:message_id>', methods=['DELETE'])
@login_required
def delete_message(message_id):
    message = Channel_Message.query.filter(Channel_Message.id == message_id).first()
    if message:
        db.session.delete(message)
        db.session.commit()
    return "Deleted message"
