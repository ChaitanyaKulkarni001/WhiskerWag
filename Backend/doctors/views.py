from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated,AllowAny
# Create your views here.

class Login()

class Profile(generics.CreateAPIView):
    queryset = Profile.objects.all()
    
    serializer_class = ProfileSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Profile.objects.filter(username=self.request.user)
    