from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Channel

class UpdatedChannelForm(FlaskForm):
    channel_id = IntegerField("channel_id", validators=[DataRequired()])
    server_id = IntegerField("server_id", validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired()])
