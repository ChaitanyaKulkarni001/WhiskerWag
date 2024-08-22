from django.shortcuts import render
from django.contrib.auth.models import User
from rest_framework import generics
from .serializers import UserSerializer,PostSerializer,PetPalSerializer
from rest_framework.permissions import IsAuthenticated,AllowAny
from .models import Post,PetPal,Doctor, Appointment
from rest_framework import viewsets
from .permissions import IsReviewUserorReadoOnly,IsAdminorReadOnly,IsAuthenticatedOrReadOnly
from rest_framework import permissions
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.shortcuts import redirect
from rest_framework_simplejwt.views import TokenObtainPairView
# Create your views here.
from .serializers import DoctorSerializer, AppointmentSerializer, UserSerializer

from rest_framework import viewsets
from django.contrib.auth.models import User

class ProfileUpdateView(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        # Return the user object of the currently authenticated user
        return self.request.user

    def update(self, request, *args, **kwargs):
        # Update the current user profile
        return super().update(request, *args, **kwargs)


class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        response = super().post(request, *args, **kwargs)
        user = request.user
        if user.is_authenticated:
            if Doctor.objects.filter(user=user).exists():
                return redirect('/doc/')
            return redirect('/home/')  # Redirect to home or wherever for non-doctors
        return response

class CreateUserView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [AllowAny]
    # print(queryset)
    

class PostListCreate(generics.ListCreateAPIView):
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    queryset = Post.objects.all()
    # def get_queryset(self):
    #     user = self.request.user
    #     # return Post.objects.all()
    #     # print(Post.objects.filter(author=user))
    #     return Post.objects.filter(author=user)
    
    def perform_create(self,serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
            
class PostDelete(generics.DestroyAPIView):
    # queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [IsAuthenticated]
    
    def  get_queryset(self):
        user = self.request.user
        # return Post.objects.all()
        return Post.objects.filter(author=user)
    
        
    
class PetPalAV(generics.ListCreateAPIView):
    queryset = PetPal.objects.all()
    serializer_class = PetPalSerializer
    permission_classes = [IsAuthenticatedOrReadOnly]
    
    def perform_create(self,serializer):
        if serializer.is_valid():
            serializer.save(author=self.request.user)
        else:
            print(serializer.errors)
    
class PetPalDeleteAV(generics.RetrieveUpdateDestroyAPIView):
    # queryset = PetPal.objects.filter(author=)
    serializer_class = PetPalSerializer
    permission_classes = [IsAuthenticated,IsReviewUserorReadoOnly]
    
    def get_queryset(self):
        
        return PetPal.objects.filter(author=self.request.user)
    
    
class IsDoctor(permissions.BasePermission):
    def has_permission(self, request, view):
        user = request.user
        if user.is_authenticated:
            return Doctor.objects.filter(user=user).exists()
        return False

@api_view(['GET'])
def check_doctor_status(request):
    if Doctor.objects.filter(user=request.user).exists():
        return Response({'status': 'Doctor'})
    return Response({'status': 'Not a Doctor'})

class DoctorViewSet(viewsets.ModelViewSet):
    queryset = Doctor.objects.all()
    permission_classes = [IsAuthenticated]
    serializer_class = DoctorSerializer

class AppointmentViewSet(viewsets.ModelViewSet):
    queryset = Appointment.objects.all()
    serializer_class = AppointmentSerializer
    permission_classes = [IsAuthenticated]  # Ensure that only authenticated users can create appointments

    def perform_create(self, serializer):
        # Automatically associate the logged-in user with the appointment
        serializer.save(user=self.request.user)
    
class GetInfo(generics.ListCreateAPIView):
    serializer_class = DoctorSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        user = self.request.user
        return Doctor.objects.filter(user=user)
    
    
class GetUserById(generics.ListCreateAPIView):
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        pk = self.kwargs.get('pk')
        return User.objects.filter(id=pk)
    
class GetDoc(generics.ListCreateAPIView):
    serializer_class = DoctorSerializer
    permission_classes = [IsAuthenticated]
    queryset = Doctor.objects.all()
    
    
class GetUserInfo(generics.ListAPIView):
    # queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    def get_queryset(self):
        return User.objects.filter(username=self.request.user)
     