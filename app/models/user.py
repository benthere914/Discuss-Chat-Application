from .db import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    icon = db.Column(db.String(2000), default='https://cdn.discordapp.com/attachments/904846014484209665/907160741671473152/v.2-white-blue-square.png')
    last_checkIn = db.Column(db.String(100))
    online = db.Column(db.Boolean, default=False)

    servers = db.relationship("Server", back_populates="user", cascade="all, delete")
    messages = db.relationship("Channel_Message", back_populates="user", cascade="all, delete")

    server_members = db.relationship("Server_Member", back_populates="user", cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email,
            'online': self.online,
            'icon': self.icon,
            'last_checkIn': self.last_checkIn
        }
