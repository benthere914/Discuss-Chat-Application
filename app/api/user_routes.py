import re
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Server_Member, db

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
def user_srvers(userId):
    userServers = Server_Member.query.filter(Server_Member.user_id == userId).all()
    servers = [server.to_dict() for server in userServers]
    return {"servers": servers}



# Create a new server. User ID is the owner of the server
@user_routes.route('/<int:userId>/servers', methods=['POST'])
@login_required
def add_server(userId):
    return "Created a new server"

@user_routes.route('/<int:userId>', methods=['PUT'])
@login_required
def update_username(userId):
    body = request.get_json()
    if (not 'password' in body):
        return {"errors": True, 'error': 'invalid password'}
    if (not( ('username' in body) or ('email' in body) or ('newPassword' in body))):
        return {'errors': True, 'error': 'invalid data'}
    user = User.query.get(userId)
    if (not user.check_password(body['password'])):
        return {"errors": True, 'error': 'invalid password'}
    if ('username' in body):
        user.username = body['username']
    if ('email' in body):
        user.email = body['email']
    if ('newPassword' in body):
        user.password = body['newPassword']
        print('changing password')
    db.session.add(user)
    db.session.commit()
    return user.to_dict()
