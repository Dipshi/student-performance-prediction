from django.db import models

# Create your models here.
class userRegisteration(models.Model):
    FirstName = models.CharField(max_length= 250)
    Email=models.CharField(max_length= 250)
    Password=models.CharField(max_length= 250)
    sid=models.IntegerField(default=15119)