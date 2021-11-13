from flask_socketio import SocketIO, emit, leave_room, join_room, send
import os

# create your SocketIO instance
socketio = SocketIO()

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://https://discuss-aa.herokuapp.com/",
        "https://https://discuss-aa.herokuapp.com/"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("send-chat")
def handle_chat(chatData):
    finalChat = {'id': chatData['id'], 'message': chatData['message'], "user": chatData['user'], "user_id": chatData['user_id'], 'date': chatData['date']}
    emit("receive-message", finalChat, broadcast=True, include_self=True)


@socketio.on("leave")
def leave_room(room):
    pass
    # code to follow

@socketio.on("join")
def join_room(room):
    pass
    # code to follow
