
from django.urls import path,include
from rest_framework.routers import DefaultRouter
from .views import get_notes ,register,CustomTokenObtainPairView,CustomTokenRefreshView,is_authenticated,logout,DocumentViewSet

router = DefaultRouter()
router.register(r'document', DocumentViewSet, basename='document')

urlpatterns = [
    path('token/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', CustomTokenRefreshView.as_view(), name='token_refresh'),
    path('register/',register),
    path('authenticated/',is_authenticated),
    path('logout/',logout),
    path('notes/', get_notes, name='get_notes'),
    path('', include(router.urls)),
]