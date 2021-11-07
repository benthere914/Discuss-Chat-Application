from flask import Blueprint, jsonify
from flask_login import login_required
# from app.models import User

member_routes = Blueprint('members', __name__)


# Delete a member (leave a server)
# Not sure if we need to include the server and user id in the url, or
# just extract it from the request body
@member_routes.route('/', methods=['DELETE'])
@login_required
def delete_member():
    return "Left the server"
