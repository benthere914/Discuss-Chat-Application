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

@socketio.on("connect")
def show_connect():
    # code to follow
    print("CLIENT CONNECTED*****************************")


@socketio.on("send-chat")
def handle_chat(chatData):
    # code to follow
    # emit("chat", chatData, broadcast=True)
    print("CLIENT CONNECTED SENT A CHAT**************************")
    print(chatData)

    emit("receive-message", chatData, broadcast=True, include_self=False)


@socketio.on("leave")
def leave_room(room):
    pass
    # code to follow

@socketio.on("join")
def join_room(room):
    pass
    # code to follow
