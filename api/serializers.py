from rest_framework import serializers
from .models import *

class item_serializer(serializers.ModelSerializer):
    class Meta:
        model = item
        fields = '__all__'
