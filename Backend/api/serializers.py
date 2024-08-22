from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Post,PetPal,Doctor, Appointment



class UserSerializer(serializers.ModelSerializer):
    is_doc = serializers.SerializerMethodField()
    gender = serializers.CharField(required=False, allow_blank=True)
    age = serializers.IntegerField(required=False, allow_null=True)
    pet_breed = serializers.CharField(required=False, allow_blank=True)
    pet_name = serializers.CharField(required=False, allow_blank=True)
    pet_favorite_food = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'gender', 'age', 'pet_breed', 'pet_name', 'pet_favorite_food', 'is_doc']

    def update(self, instance, validated_data):
        # Update fields that are passed in the request
        gender = validated_data.get('gender', instance.gender)
        age = validated_data.get('age', instance.age)
        pet_breed = validated_data.get('pet_breed', instance.pet_breed)
        pet_name = validated_data.get('pet_name', instance.pet_name)
        pet_favorite_food = validated_data.get('pet_favorite_food', instance.pet_favorite_food)

        instance.gender = gender
        instance.age = age
        instance.pet_breed = pet_breed
        instance.pet_name = pet_name
        instance.pet_favorite_food = pet_favorite_food

        instance.save()
        return instance

    def get_is_doc(self, obj):
        return Doctor.objects.filter(user=obj).exists()


class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ['id','title','content','created_at','author','img']
        extra_kwargs = {'author': {'read_only':True}}

class PetPalSerializer(serializers.ModelSerializer):
    class Meta:
        model = PetPal
        fields = '__all__'
        extra_kwargs = {'author': {'read_only':True}}
        
        

class DoctorSerializer(serializers.ModelSerializer):
    user = UserSerializer()  # Nested serializer to include user details
    # id = serializers.IntegerField(read_only=True)  # Corrected the field type

    class Meta:
        model = Doctor
        fields = ['id', 'user', 'specialization', 'availability', 'img']


class AppointmentSerializer(serializers.ModelSerializer):
    # Make the user field read-only since it's set by the system
    user = serializers.ReadOnlyField(source='user.username')

    # Use PrimaryKeyRelatedField to allow input for the doctor field
    doctor = serializers.PrimaryKeyRelatedField(queryset=Doctor.objects.all())

    class Meta:
        model = Appointment
        fields = '__all__'