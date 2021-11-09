from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Channel

class NewChannelForm(FlaskForm):
    server_id = IntegerField("server_id", validators=[DataRequired()])
    name = StringField("name", validators=[DataRequired()])
