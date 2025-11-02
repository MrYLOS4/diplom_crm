from rest_framework import viewsets
from .models import Deal
from .serializers import DealSerializer

class DealViewSet(viewsets.ModelViewSet):
    queryset = Deal.objects.all()
    serializer_class = DealSerializer
    # УБРАТЬ permission_classes - оставить ТОЛЬКО эти 2 строки выше
    
    def get_queryset(self):
        return Deal.objects.all().select_related('client').order_by('-created_at')