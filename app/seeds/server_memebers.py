from app.models import db, User, Server, Server_Member
import random

def seed_members():


    nums = [num for num in range(1, 29)]
    for i in range(1, 29):
        memberNums = []
        for _ in range(10):
            rand = random.choice(nums)
            if rand not in memberNums:
                memberNums.append(rand)
        for j in memberNums:
            if j != i:
                db.session.add(Server_Member(server_id=i, user_id=j))

    db.session.commit()

def undo_Server_Member():
    db.session.execute('TRUNCATE server_members RESTART IDENTITY CASCADE;')
    db.session.commit()
