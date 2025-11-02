from django.contrib import admin
from .models import Client

class ClientAdmin(admin.ModelAdmin):
    list_display = ['name', 'email', 'phone', 'company', 'status', 'created_at']

admin.site.register(Client, ClientAdmin)

