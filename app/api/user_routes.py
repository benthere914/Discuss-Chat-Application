import re
import datetime
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Server_Member, Server, db
# from app.models.server import
from .auth_routes import validation_errors_to_error_messages
from app.forms.NewServerForm import NewServerForm

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
def user_servers(userId):
    users_server = Server.query.join(Server_Member).filter(Server_Member.user_id == userId).all()
    servers = [server.to_dict() for server in users_server]
    return {"servers": servers}

# Create a new server. User ID is the owner of the server
@user_routes.route('/<int:userId>/servers', methods=['POST'])
@login_required
def add_server(userId):
    form = NewServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server = Server(name = form.data['name'], description = form.data['description'], icon = form.data['icon'], owner_id = userId)
        db.session.add(server)
        db.session.commit()
        createdServer = server.to_dict()
        serverMember = Server_Member(user_id=userId, server_id=createdServer['id'])
        db.session.add(serverMember)
        db.session.commit()
        return server.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@user_routes.route('/<int:userId>', methods=['PUT'])
@login_required
def update_data(userId):
    body = request.get_json()
    password = data = 'good'
    user = User.query.get(userId)
    emailRegex = '(?:[a-z0-9!#$%&\'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&\'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])'
    passwordRegex = '^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$'



    if (not 'password' in body):
        password = 'must enter password'

    if (not( ('username' in body and len(body['username']) > 0) or ('email' in body and len(body['email']) > 0) or ('newPassword' in body and len(body['newPassword']) > 0) or ('newIcon' in body and len(body['newIcon']) > 0))):
        data = 'must fill out all fields'

    if (not user.check_password(body['password'])):
        password = 'Invalid password'

    if (user.username == 'Demo' or user.username == 'demo'):
        password = 'Cannot edit this user'
        data = 'Cannot edit this user'

    if ('email' in body):
        if not bool(re.search(emailRegex, body["email"])):
            data = 'invalid email'

    if ('newPassword' in body):
        if not bool(re.search(passwordRegex, body["newPassword"])):
            data = 'new password must contain at least 8 characters, 1 letter, number and special character'

    if 'good' == password == data:

        if ('username' in body):
            user.username = body['username']

        if ('email' in body):
            user.email = body['email']

        if ('newPassword' in body):
            user.password = body['newPassword']

        if ('newIcon' in body):
            user.icon = body['newIcon']

        db.session.add(user)
        db.session.commit()
        return user.to_dict()
    else:
        return {'errors': True, 'errorData': {'password': password, 'data': data}}


@user_routes.route('/<int:userId>', methods=['DELETE'])
@login_required
def delete_user(userId):
    user = User.query.get(userId)
    body = request.get_json()
    if (user.username == 'Demo' or user.username == 'demo'):
        return {"message": "Cannot delete this user"}
    if (user.check_password(body["password"])):
        db.session.delete(user)
        db.session.commit()
        return {"message":"Success"}
    else:
        return {"message":"Incorrect Password"}

# @user_routes.route('/update_checkin', methods=['POST'])
# @login_required
# def update_checkin():
#     now = datetime.datetime.now().minute
#     body = request.get_json()
#     id = body['id']
#     user = User.query.get(id)
#     user.last_checkIn = now
#     db.session.add(user)
#     db.session.commit()
#     return 'success'

@user_routes.route('/removeCheckin', methods=['POST'])
# @login_required
def update_checkin():
    body = request.get_json()
    id = body['id']
    user = User.query.get(id)
    user.last_checkIn = None
    user.online = False
    db.session.add(user)
    db.session.commit()
    return 'success'
