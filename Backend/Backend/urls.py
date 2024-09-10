from django.contrib import admin
from django.urls import path,include
from api.views import CreateUserView,CustomTokenObtainPairView,UserInformationView
# from rest_framework_simplejwt.views import TokenObtainPairView,TokenRefreshView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/user/register/',CreateUserView.as_view(),name = 'register'),
    path('api/user/register/keep_user_data/',UserInformationView.as_view(),name = 'register'),
    path('api/token/',TokenObtainPairView.as_view(),name = 'get_token'),
    path('api/token/refresh/',TokenRefreshView.as_view(),name = 'refresh_token'),
    path('api-auth/',include('rest_framework.urls')),
    path('api/',include('api.urls')),
    path('api/token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),

] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

# if settings.DEBUG:
#     urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)