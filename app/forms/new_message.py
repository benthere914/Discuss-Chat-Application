from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Channel

class NewMessageForm(FlaskForm):
    channel_id = IntegerField("channel_id", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    message = StringField("message", validators=[DataRequired()])
