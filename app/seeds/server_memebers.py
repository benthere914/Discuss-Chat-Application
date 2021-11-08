from app.models import db, User, Server, Server_Member

def seed_members():
    member1a = Server_Member(server_id=1, user_id=1)
    member1b = Server_Member(server_id=2, user_id=1)
    member2 = Server_Member(server_id=2, user_id=2)
    member3 = Server_Member(server_id=3, user_id=3)

    db.session.add(member1a)
    db.session.add(member1b)
    db.session.add(member2)
    db.session.add(member3)


    db.session.commit()

def undo_Server_Member():
    db.session.execute('TRUNCATE server_members RESTART IDENTITY CASCADE;')
    db.session.commit()