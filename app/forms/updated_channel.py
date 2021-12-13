from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Channel

def not_long_enough(form, field):
    name = field.data
    if not 1 <= len(name) <= 40:
        raise ValidationError("not long enough")

class UpdatedChannelForm(FlaskForm):
    channel_id = IntegerField("channel_id", validators=[DataRequired()])
    server_id = IntegerField("server_id", validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired(), not_long_enough])
