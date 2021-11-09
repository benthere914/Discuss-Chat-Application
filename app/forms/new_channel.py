from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Channel

def channel_exists(form, field):
    print("*******************8888888888")
    print(form.data)
    print("*******************8888888888")
    name = form.data['name']
    server_id = form.data['server_id']
    channel = Channel.query.filter(Channel.name == name).filter(Channel.server_id == server_id).first()
    if channel:
        raise ValidationError('Channel name already exists in this server.')

class NewChannelForm(FlaskForm):
    server_id = IntegerField("server_id", validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired(), channel_exists])
