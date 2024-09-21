from django.contrib.auth.models import User
from rest_framework import serializers
from .models import Post,PetPal,Doctor, Appointment,PostLike,UserInformations



class UserInformationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserInformations
        fields =['username','email','gender','age','pet_breed','pet_name','pet_favorite_food','img']



class UserSerializer(serializers.ModelSerializer):
    is_doc = serializers.SerializerMethodField()
    gender = serializers.CharField(required=False, allow_blank=True)
    age = serializers.IntegerField(required=False, allow_null=True)
    pet_breed = serializers.CharField(required=False, allow_blank=True)
    pet_name = serializers.CharField(required=False, allow_blank=True)
    pet_favorite_food = serializers.CharField(required=False, allow_blank=True)

    class Meta:
        model = User
        fields = ['id', 'username', 'gender', 'age', 'pet_breed', 'pet_name', 'pet_favorite_food', 'is_doc',"password"]

        extra_kwargs = {
            "password":{"write_only": True}
        }
    def update(self, instance, validated_data):
        # Update fields that are passed in the request
        
        try:
            print("validated_data->",validated_data)
                
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
        except Exception as e:
            print("Error ",e)

    def get_is_doc(self, obj):
        return Doctor.objects.filter(user=obj).exists()
    
    def create(self,validated_data):
        user = User.objects.create_user(**validated_data)
        
        return user

class PostLikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostLike
        fields = ['post', 'user']


class PostSerializer(serializers.ModelSerializer):
    like_count = serializers.SerializerMethodField()
    user_has_liked = serializers.SerializerMethodField()
    author_name = serializers.CharField(source='author.username', read_only=True)
    class Meta:
        model = Post
        fields = ['id','title','content','created_at','author_name','author','img', 'like_count', 'user_has_liked']
        extra_kwargs = {'author': {'read_only':True}}
        
    def get_like_count(self, obj):
        return obj.likes.count()

    def get_user_has_liked(self, obj):
        request = self.context.get('request')
        if request and request.user.is_authenticated:
            return obj.likes.filter(user=request.user).exists()
        return False

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