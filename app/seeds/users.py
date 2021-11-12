from app.models import db, User
from faker import Faker
fake = Faker()


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', last_checkIn=None, online=False)
    marnie = User(
        username='marnie', email='marnie@aa.io', password='password', last_checkIn=None, online=False)
    bobbie = User(
        username='bobbie', email='bobbie@aa.io', password='password', last_checkIn=None, online=False)


    db.session.add(demo)
    db.session.add(marnie)
    db.session.add(bobbie)
    for i in range(1, 26):
        db.session.add(User(username=fake.name(), email=fake.ascii_email(), icon=fake.image_url(), password='password', last_checkIn=None, online=False))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
