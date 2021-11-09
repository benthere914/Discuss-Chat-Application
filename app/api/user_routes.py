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
def user_srvers(userId):
    userServers = Server_Member.query.filter(Server_Member.user_id == userId).all()
    servers = [server.to_dict() for server in userServers]
    return {"servers": servers}

# Create a new server. User ID is the owner of the server
@user_routes.route('/<int:userId>/servers', methods=['POST'])
@login_required
def add_server(userId):
    form = NewServerForm()
    form['csrf_token'].data = request.cookies['csrf_token']
    if form.validate_on_submit():
        server = NewServerForm()
        form.populate_obj(server, owner_id=form.data[userId])
        # server = Server(owner_id=form.data[userId],
        #     server_id=form.data['server_id'])
        db.session.add(server)
        db.session.commit()
        return server.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401