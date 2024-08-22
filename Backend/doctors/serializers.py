from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Profile

class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = ['name','title','content','created_at','author','img']
        extra_kwargs = {'author': {'read_only':True}}