from flask_wtf import FlaskForm
from wtforms import IntegerField, StringField
from wtforms.validators import DataRequired, ValidationError
from app.models import Server_Member

def member_exists(form, field):
    user_id = form.data['user_id']
    server_id = form.data['server_id']
    server = Server_Member.query.filter(Server_Member.user_id == user_id).filter(Server_Member.server_id == server_id).first()
    if server:
        raise ValidationError('User already exists in this server.')

class AddMemberForm(FlaskForm):
    server_id = IntegerField("server_id", validators=[DataRequired()])
    user_id = StringField("user_id", validators=[DataRequired(), member_exists])