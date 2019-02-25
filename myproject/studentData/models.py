from django.db import models

# Create your models here.
class studentData(models.Model):
    Year     = models.CharField(max_length= 250)
    FirstName = models.CharField(max_length= 250)
    FatherName = models.CharField(max_length= 250)
    MotherName = models.CharField(max_length= 250)
    LastName = models.CharField(max_length= 250)
    Date_of_Birth = models.CharField(max_length= 250)
    Gender = models.CharField(max_length= 250)
    College_Admission_Year = models.CharField(max_length= 250)
    Admission_Category= models.CharField(max_length= 250)
    Caste = models.CharField(max_length= 250)
    Gap = models.CharField(max_length= 250)
    Select_your_Current_Graduation= models.CharField(max_length= 250)








