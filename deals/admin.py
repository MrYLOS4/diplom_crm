from django.contrib import admin
from .models import Deal

class DealAdmin(admin.ModelAdmin):
    list_display = ['title', 'client', 'amount', 'stage', 'probability', 'created_at']

admin.site.register(Deal, DealAdmin)
