from django.db import models

# Create your models here.
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

# User = get_user_model()
class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    img = models.ImageField(upload_to='images/')
    author = models.ForeignKey(User,on_delete=models.CASCADE,related_name='notes')

    def __str__(self):
        return self.title
    
    
class PetPal(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    pet_name = models.CharField(max_length=200)
    description = models.TextField(blank=False, max_length=1000)
    Quick_tip=models.TextField(blank=True, max_length=500)
    
    def __str__(self):
        return f"{self.pet_name} by {self.author}"
 
class Doctor(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    # id = models.IntegerField(primary_key=True)
    specialization = models.CharField(max_length=100)
    availability = models.TextField()
    img = models.ImageField(upload_to='images/', default='man.jpg')

    def __str__(self):
        return f"Dr. {self.user.username} - {self.specialization}"

class Appointment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    pets_name = models.CharField(max_length=30)
    pets_age =models.PositiveIntegerField()
    pets_breed = models.CharField(max_length=40)  
    doctor = models.ForeignKey(Doctor, on_delete=models.CASCADE)
    appointment_date = models.DateTimeField()
    status = models.CharField(max_length=50, choices=[('Scheduled', 'Scheduled'), ('Completed', 'Completed'), ('Cancelled', 'Cancelled')])

    def __str__(self):
        return f"Appointment with {self.doctor} on {self.appointment_date}"
    
