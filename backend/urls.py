from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/auth/', include('rest_framework.urls')),  # ← ЗАПЯТАЯ
    path('api/', include('clients.urls')),              # ← ЗАПЯТАЯ
    path('api/', include('deals.urls')),                # ← ЗАПЯТАЯ
]