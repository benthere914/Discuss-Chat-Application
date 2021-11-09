from flask import Blueprint, jsonify
from flask_login import login_required
# from app.models import User

message_routes = Blueprint('messages', __name__)

# Update a message
@message_routes.route('/<int:messageId>', methods=['PATCH'])
@login_required
def update_message(messageId):
    return "Updated message"


# Delete a message
@message_routes.route('/<int:messageId>', methods=['DELETE'])
@login_required
def delete_message(messageId):
    return "Deleted message"
