from django.contrib import admin
from.models import Post,PetPal,Doctor,Appointment,PostLike,UserInformations
# Register your models here.

admin.site.register(Post)
admin.site.register(PetPal)
admin.site.register(Doctor)
admin.site.register(Appointment)
admin.site.register(PostLike) 
admin.site.register(UserInformations)