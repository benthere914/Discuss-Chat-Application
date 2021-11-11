from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Server

class NewServerForm(FlaskForm):
    name = StringField("name", validators=[DataRequired()])
    description = StringField("description")
    icon = StringField("icon")
