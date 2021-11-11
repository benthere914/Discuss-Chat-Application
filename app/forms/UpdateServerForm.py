from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Server

# def server_exists(form, field):
#     name = form.data['name']
#     server = Server.query.filter(Server.name == name).first()
#     if server:
#         raise ValidationError('Server name already exists in this server.')

class UpdateServerForm(FlaskForm):
    #server_id = IntegerField("server_id")
    name = StringField("name")
    description = StringField("description")
    icon = StringField("icon")