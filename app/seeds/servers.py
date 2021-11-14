from app.models import db, Server
from coolname import generate_slug
from faker import Faker

from app.models.server_memebers import Server_Member
fake = Faker()

# Adds a demo user, you can add other users here if you want
def seed_servers():
    # for i in range(1, 26):
    #     serv = Server(name=f'Server {i}', description=f'This is server {i}', owner_id=(1), icon='https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636394875/Discuss/discord_bj2duo.png')
    #     db.session.add(serv)
    #     db.session.commit()
    # for i in range(26, 51):
    #     serv = Server(name=f'Server {i}', description=f'This is server {i}', owner_id=(2), icon='https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636394875/Discuss/discord_bj2duo.png')
    #     db.session.add(serv)
    #     db.session.commit()
    # for i in range(51, 76):
    #     serv = Server(name=f'Server {i}', description=f'This is server {i}', owner_id=(3), icon='https://res.cloudinary.com/dt8q1ngxj/image/upload/v1636394875/Discuss/discord_bj2duo.png')
    #     db.session.add(serv)
    #     db.session.commit()

    for i in range(1, 29):
        db.session.add(Server(name=generate_slug()[0:40], description= fake.sentence(nb_words=15, variable_nb_words=True), owner_id=(i), icon=fake.image_url()))
        db.session.add(Server_Member(server_id=i, user_id=i))
        db.session.commit()

# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_servers():
    db.session.execute('TRUNCATE servers RESTART IDENTITY CASCADE;')
    db.session.commit()
