from django.db import models

# Create your models here.
class Profile(models.Model):
    doctor_name = models.CharField(max_length=40)
    degree = models.CharField(max_length=30)
    bio = models.TextField(max_length=500)
    