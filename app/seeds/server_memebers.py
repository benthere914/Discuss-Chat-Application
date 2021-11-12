from app.models import db, User, Server, Server_Member
import random

def seed_members():


    for i in range(1, 103):
        for j in range(1,9):
            db.session.add(Server_Member(server_id=i, user_id=random.choice([num for num in range(1, 103)])))


    db.session.commit()

def undo_Server_Member():
    db.session.execute('TRUNCATE server_members RESTART IDENTITY CASCADE;')
    db.session.commit()
