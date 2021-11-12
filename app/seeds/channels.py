from app.models import db, Channel
from coolname import generate_slug


# Adds a demo user, you can add other users here if you want
def seed_channels():
    # one = Channel(
    #     name='Channel One', server_id=1)
    # two = Channel(
    #     name='Channel Two', server_id=1)
    # three = Channel(
    #     name='Channel Three', server_id=1)

    # db.session.add(one)
    # db.session.add(two)
    # db.session.add(three)

    # db.session.commit()
    for i in range(1, 29):
        for j in range(1, 8):
            db.session.add(Channel(name=generate_slug()[0:40], server_id=i))
    db.session.commit()
# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_channels():
    db.session.execute('TRUNCATE channels RESTART IDENTITY CASCADE;')
    db.session.commit()
