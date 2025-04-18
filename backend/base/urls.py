
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import get_notes ,register,CustomTokenObtainPairView,CustomTokenRefreshView,is_authenticated,logout,DocumentViewSet,UploadViewSet,UpcomingEventViewSet,ProfileView,update_profile,get_profile,MessageAPIViewSet

router = DefaultRouter()
router.register(r'document', DocumentViewSet)
router.register(r'upload', UploadViewSet)
router.register(r'upcomingevent', UpcomingEventViewSet)
router.register(r'profile', ProfileView)

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('register/',register),
    path('authenticated/',is_authenticated),
    path('logout/',logout),
    path('notes/', get_notes, name='get_notes'),
    path('profile/update/', update_profile, name='update_profile'),
    path('profile/get/', get_profile, name='get_profile'),
    path('message/', MessageAPIViewSet.as_view(), name='perform_create'),
    path('', include(router.urls)),
]