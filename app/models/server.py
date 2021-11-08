from .db import db


class Server(db.Model):
    __tablename__ = 'servers'

    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(40), nullable=False, unique=True)
    description = db.Column(db.String(500), nullable=True, unique=False)
    owner_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False, unique=False)
    icon = db.Column(db.String(1000), nullable=False, unique= False)

    user = db.relationship("User", back_populates="servers")
    members = db.relationship("", back_populates="")
    channels = db.relationship("", back_populates="")




    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'description': self.description,
            'owner_id': self.owner_id,
            'icon': self.icon
        }
