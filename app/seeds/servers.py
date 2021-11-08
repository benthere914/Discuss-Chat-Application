from app.models import db, Server


# Adds a demo user, you can add other users here if you want
def seed_servers():
    one = Server(
        name='Server One', description='This is Server One', owner_id=1, icon="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636394875/Discuss/discord_bj2duo.png")
    two = Server(
        name='Server Two', description='This is Server Two', owner_id=1, icon="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636394875/Discuss/discord_bj2duo.png")
    three = Server(
        name='Server Three', description='This is Server Three', owner_id=1, icon="https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636394875/Discuss/discord_bj2duo.png")

    db.session.add(one)
    db.session.add(two)
    db.session.add(three)

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
