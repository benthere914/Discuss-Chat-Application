from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Server

def server_exists(form, field):
    name = form.data['name']
    server = Server.query.filter(Server.name == name).first()
    if server:
        raise ValidationError('Server name already exists in this server.')

class NewServerForm(FlaskForm):
    name = StringField("name", validators=[DataRequired(), server_exists])
    description = StringField("description")
    owner_id = IntegerField("owner_id")
    icon = StringField("icon")
