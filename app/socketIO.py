from flask_socketio import SocketIO, emit, leave_room, join_room
import os

# create your SocketIO instance
socketio = SocketIO()

if os.environ.get("FLASK_ENV") == "production":
    origins = [
        "http://discuss-aa.herokuapp.com",
        "https://discuss-aa.herokuapp.com"
    ]
else:
    origins = "*"

# create your SocketIO instance
socketio = SocketIO(cors_allowed_origins=origins)


@socketio.on("send-chat")
def send_chat_out(chatData):
    room = chatData['channel_id']
    finalChat = {'id': chatData['id'], 'message': chatData['message'], "user": chatData['user'], "user_id": chatData['user_id'], 'date': chatData['date']}
    emit("receive-message", finalChat, room=room)

    # This broadcasts to all clients, regardless of room
    # emit("receive-message", finalChat, broadCast=True, includeSelf=True)


@socketio.on("leave")
def leave_last_room(room):
    print("LEAVING ******************", room['lastRoom'])
    leave_room(room['lastRoom'])

@socketio.on("join-room")
def join_current_room(room):
    print("JOINING ******************", room['currentRoom'])
    join_room(room['currentRoom'])
