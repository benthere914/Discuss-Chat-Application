from .db import db

# joins table
# server_members = db.Table(
#     "server_members",  # table name
#     db.Column("server_id", db.Integer, db.ForeignKey("servers.id")),
#     db.Column("user_id", db.Integer, db.ForeignKey("users.id"))
# )

class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=False)
    description = db.Column(db.String(500), nullable=True, unique=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, unique=False)
    icon = db.Column(db.String(1000), nullable=False, unique= False)

    user = db.relationship("User", back_populates="servers")
    channels = db.relationship("Channel", back_populates="server", cascade='all, delete')
    server_members_2 = db.relationship("Server_Member", back_populates="server", cascade='all, delete-orphan')


    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'owner_id': self.owner_id,
            'icon': self.icon
        }
