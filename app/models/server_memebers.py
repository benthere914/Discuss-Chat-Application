from .db import db

class Server_Member(db.Model):
    __tablename__ = 'server_members'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, unique=False)
    server_id = db.Column(db.Integer, db.ForeignKey("servers.id"), nullable=False, unique=False)

    user = db.relationship("User", back_populates="server_members")
    server = db.relationship("Server", back_populates="server_members_2")

    def to_dict(self):
        return {
            'id': self.id,
            'user_id': self.user_id,
            'server_id': self.server_id
        }
