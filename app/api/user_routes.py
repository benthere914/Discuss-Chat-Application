
from flask import Blueprint, jsonify, request
from flask_login import login_required
from app.models import User, Server_Member, db
from app.models.server import Server
from .auth_routes import validation_errors_to_error_messages
from app.forms import NewServerForm

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
        return server.to_dict()
  return {'errors': validation_errors_to_error_messages(form.errors)}, 401

@user_routes.route('/<int:userId>', methods=['PUT'])
@login_required
def update_username(userId):
    body = request.get_json()
    errorData = {}
    print(body)
    if (not 'password' in body):
        errorData["password"] = True
    if (not( ('username' in body and len(body['username']) > 0) or ('email' in body and len(body['email']) > 0) or ('newPassword' in body and len(body['newPassword']) > 0))):
        errorData["data"] = True
    user = User.query.get(userId)
    if (not user.check_password(body['password'])):
        errorData["password"] = True
    if ('data' in errorData or 'password' in errorData):
        return {"errors": True, "errorData": errorData}
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
