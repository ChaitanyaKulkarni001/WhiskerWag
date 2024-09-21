from django.db import models

# Create your models here.
from django.contrib.auth.models import User

# User = get_user_model()

# from django.db import models

class UserInformations(models.Model):
    
    gender = models.CharField(
        max_length=20, 
        choices=[('Male', 'Male'), ('Female', 'Female'), ('Not to specify', 'Not to specify')]
    )
    age = models.PositiveIntegerField()
    pet_breed = models.CharField(max_length=80 , blank=True)
    pet_name = models.CharField(max_length=60,blank=True)
    pet_favorite_food = models.CharField(max_length=200,blank=True)
    img = models.ImageField(upload_to='images/', null=True, blank=True)
    username = models.CharField(max_length=50)
    email = models.EmailField(max_length=254)
    
   
class Post(models.Model):
    title = models.CharField(max_length=100)
    content = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    img = models.ImageField(upload_to='images/')
    author = models.ForeignKey(User,on_delete=models.CASCADE,related_name='notes')

    def __str__(self):
        return self.title


class PostLike(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='likes')
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='user_likes')

    class Meta:
        unique_together = ('post', 'user')  # Ensure a user can only like a post once
        
    def __str__(self):
        return f"{self.user.username} liked {self.post.title} post"
    
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
    