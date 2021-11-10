from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError


class UpdateMessageForm(FlaskForm):
    message_id = IntegerField("message_id", validators=[DataRequired()])
    channel_id = IntegerField("channel_id", validators=[DataRequired()])
    user_id = IntegerField("user_id", validators=[DataRequired()])
    message = StringField("message", validators=[DataRequired()])
