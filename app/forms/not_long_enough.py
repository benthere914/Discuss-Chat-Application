from wtforms.validators import ValidationError

def not_long_enough(form, field):
    name = field.data
    if not 1 <= len(name):
        raise ValidationError("Name Is Too Short")
    elif not len(name) <= 40:
        raise ValidationError("Name Is Too Long")
