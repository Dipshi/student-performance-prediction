from django.db import models

# Create your models here.
class userRegister(models.Model):
    FirstName = models.CharField(max_length= 250)
    Email=models.CharField(max_length= 250)
    Password=models.CharField(max_length= 250)



# class studentAcaDetails(models.Model):
#     sid=models.ForeignKey(userRegister, on_delete=models.CASCADE,related_name='sid')
#     tenth_score     = models.CharField(max_length= 250)
#     twelve_score  = models.CharField(max_length= 250)
#     Diploma_score = models.CharField(max_length= 250)
#     Sem1 = models.CharField(max_length= 250)
#     Sem1_dead_kt = models.CharField(max_length= 250)
#     Sem1_live_kt = models.CharField(max_length= 250)
#     Sem2 = models.CharField(max_length= 250)
#     Sem2_dead_kt = models.CharField(max_length= 250)
#     Sem2_live_kt = models.CharField(max_length= 250)
#     Sem3 = models.CharField(max_length= 250)
#     Sem3_dead_kt = models.CharField(max_length= 250)
#     Sem3_live_kt = models.CharField(max_length= 250)
#     Sem4 = models.CharField(max_length= 250)
#     Sem4_dead_kt = models.CharField(max_length= 250)
#     Sem4_live_kt = models.CharField(max_length= 250)
#     Sem5 = models.CharField(max_length= 250)
#     Sem5_dead_kt = models.CharField(max_length= 250)
#     Sem5_live_kt = models.CharField(max_length= 250)
#     Sem6 = models.CharField(max_length= 250)
#     Sem6_dead_kt = models.CharField(max_length= 250)
#     Sem6_live_kt = models.CharField(max_length= 250)
#     Sem7 = models.CharField(max_length= 250)
#     Sem7_dead_kt = models.CharField(max_length= 250)
#     Sem7_live_kt = models.CharField(max_length= 250)