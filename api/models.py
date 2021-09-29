from django.db import models
from django.db.models.aggregates import Avg, Count, Sum
from django.db.models.deletion import DO_NOTHING
from django.utils import timezone
from django.contrib.auth.models import User
import re

class item(models.Model):
    name = models.CharField(max_length=200)
    description = models.TextField(blank=True)
    quantity = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    quantity_unit = models.CharField(max_length=200, choices=[('none', ''), ('kg', 'Kg'), ('ltr', 'L'), ('nos', 'Nos')], default="", blank=True)
    price = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    status = models.CharField(max_length=200, choices=[('pending', 'Pending'), ('bought', 'Bought'),('unavailable', 'Unavailable')], default='pending')
    
    scheduled_date = models.DateTimeField(default=timezone.now, blank=True)

    created_on = models.DateTimeField(default=timezone.now, blank=True)
    updated_on = models.DateTimeField(default=timezone.now, blank=True)
    created_by = models.ForeignKey(User, on_delete=DO_NOTHING, related_name='items_created_by', null=True)

    def __str__(self):
        return self.name
    
    def save(self, *args, **kwargs):
        ''' On save, update timestamps '''
        if not self.id:
            self.created_on = timezone.now()
        self.updated_on = timezone.now()
        return super(item, self).save(*args, **kwargs)

    total_amount = property(lambda self: self.quantity * self.price)
