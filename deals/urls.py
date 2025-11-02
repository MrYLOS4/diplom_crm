from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import DealViewSet

router = DefaultRouter()
router.register(r'deals', DealViewSet)  # ← убрать пробел после r

urlpatterns = [
    path('', include(router.urls)),
]