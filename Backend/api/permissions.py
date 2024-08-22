from rest_framework import permissions 

class IsAdminorReadOnly(permissions.IsAdminUser):
    def has_permission(self, request, view):
        admin_permission =  bool(request.user and request.user.is_staff)
        return request.method == 'GET' or admin_permission


class IsAuthenticatedOrReadOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        return request.user and request.user.is_authenticated
    
class IsReviewUserorReadoOnly(permissions.BasePermission):
    def has_object_permission(self, request, view,obj):
        if request.method in permissions.SAFE_METHODS:
            return True
        # Check permissions for read-only request
        else:
            return obj.author == request.user or request.user.is_staff