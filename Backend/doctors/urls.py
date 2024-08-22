from django.urls import path
from . import views
urlpatterns = [
    
    path('profile/',views.Profile.as_view()),
    path('/',views.Dashboard.as_view()),
    path('Scheduled_meetings/',views.Scheduled_meetings.as_view()),
    path('login/',views.Login.as_view()),
]
