import datetime
import time
from app.models import User, Server_Member, db
def diff(num1, num2, num3):
    return num1 - num2 <= num3 or num2 - num1 <= num3

def func():
    time.sleep(5)
    # while True:
    #     users = {user.name:user.to_dict() for user in User.query.all()}
    #     now = datetime.datetime.now().minute
    #     for user in users:
    #         print(user)
    #     time.sleep(100)
