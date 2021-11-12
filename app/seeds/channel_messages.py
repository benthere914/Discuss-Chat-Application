from app.models import db, Channel_Message, Server_Member, Server, Channel
import datetime
import random
from faker import Faker
fake = Faker()

def seed_messages():
    # channel1message1 = Channel_Message(channel_id=1, user_id=1,  message="Demo(1): channel 1 message 1/3", date=datetime.datetime.today())
    # channel1message2 = Channel_Message(channel_id=1, user_id=2,  message="marnie(2): channel 1 message 2/3", date=datetime.datetime.today())
    # channel1message3 = Channel_Message(channel_id=1, user_id=3,  message="bobbie(3): channel 1 message 3/3", date=datetime.datetime.today())
    # channel2message1 = Channel_Message(channel_id=2, user_id=3,  message="bobbie(3): channel 2 message 1/2", date=datetime.datetime.today())
    # channel2message2 = Channel_Message(channel_id=2, user_id=2,  message="marnie(2): channel 2 message 2/2", date=datetime.datetime.today())
    # channel3message1 = Channel_Message(channel_id=3, user_id=1,  message="Demo(1): channel 3 message 1/1", date=datetime.datetime.today())

    # db.session.add(channel1message1)
    # db.session.add(channel1message2)
    # db.session.add(channel1message3)
    # db.session.add(channel2message1)
    # db.session.add(channel2message2)
    # db.session.add(channel3message1)

    for i in range(1, 29):
        members = [member.to_dict() for member in Server_Member.query.filter(Server_Member.server_id == i).all()]
        channels = [channel.to_dict() for channel in Channel.query.filter(Channel.server_id == i).all()]
        for j in range(len(channels)):
            for k in range(15):
                db.session.add(Channel_Message(channel_id=channels[j]['id'], user_id=random.choice(members)['user_id'], message=fake.sentence(nb_words=25, variable_nb_words=True), date=datetime.datetime.today()))


    db.session.commit()

def undo_channel_message():
    db.session.execute('TRUNCATE channel_messages RESTART IDENTITY CASCADE;')
    db.session.commit()
