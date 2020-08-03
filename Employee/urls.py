from .views import *
from rest_framework import routers
from django.urls import path


router = routers.DefaultRouter()
router.register('user', UserViewSet, basename='user')
router.register('leave', LeaveViewSet, basename='leave')
router.register('approval', LeaveApprovalViewSet, basename='approval')


urlpatterns = router.urls


# urlpatterns += [
#     path('user_staff/<staff_id>/', get_staff_id, name='staff')
# ]
