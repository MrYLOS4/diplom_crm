from rest_framework import serializers
from .models import Deal
from clients.serializers import ClientSerializer

class DealSerializer(serializers.ModelSerializer):
    # Дополнительные поля для удобства
    client_name = serializers.CharField(source='client.name', read_only=True)
    client_email = serializers.CharField(source='client.email', read_only=True)
    
    class Meta:
        model = Deal
        fields = '__all__'
        read_only_fields = ('id', 'created_at', 'updated_at')