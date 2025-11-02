from django.db import models

class Deal(models.Model):
    STAGE_CHOICES = [
        ('lead', 'Лид'),
        ('contact', 'Контакт'),
        ('proposal', 'Предложение'),
        ('negotiation', 'Переговоры'),
        ('won', 'Успех'),
        ('lost', 'Потерян'),
    ]
    
    title = models.CharField(max_length=200, verbose_name='Название сделки')
    client = models.ForeignKey('clients.Client', on_delete=models.CASCADE, related_name='deals')
    amount = models.DecimalField(max_digits=10, decimal_places=2, verbose_name='Сумма')
    stage = models.CharField(max_length=20, choices=STAGE_CHOICES, default='lead')
    probability = models.IntegerField(default=0, verbose_name='Вероятность (%)')
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    expected_close = models.DateField(null=True, blank=True, verbose_name='Ожидаемая дата закрытия')
    
    class Meta:
        verbose_name = 'Сделка'
        verbose_name_plural = 'Сделки'
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.client.name}"