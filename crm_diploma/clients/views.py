from rest_framework import viewsets
from .models import Client
from .serializers import ClientSerializer

class ClientViewSet(viewsets.ModelViewSet):
    queryset = Client.objects.all()
    serializer_class = ClientSerializer
    # УБРАТЬ permission_classes - оставить ТОЛЬКО эти 2 строки выше
    
    def get_queryset(self):
        return Client.objects.all().order_by('-created_at')