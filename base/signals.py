from django.db.models.signals import pre_save
from django.contrib.auth.models import User

# *args takes list
# **kwargs takes only key and value as a pair
def updateUser(sender, instance, **kwargs):
    user = instance
    if user.email != "":
        user.username = user.email
    print("Signal triggered")


pre_save.connect(updateUser, sender=User)
