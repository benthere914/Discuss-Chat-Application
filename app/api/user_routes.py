from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()


'''
View and create servers
'''

# Get all servers a single user is a memeber of
@user_routes.route('/<int:userId>/servers')
@login_required
def userServers(userId):
    return "All servers for a single user"


# Create a new server. User ID is the owner of the server
@user_routes.route('/<int:userId>/servers', methods=['POST'])
@login_required
def userServers(userId):
    return "Created a new server"
