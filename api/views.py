from django.contrib.auth.models import User
from django.db.models import manager
from rest_framework import response

from datetime import date, datetime
from rest_framework import serializers, viewsets, permissions, renderers
from rest_framework.response import Response
# from rest_framework.views import APIView

from django_filters.rest_framework import DjangoFilterBackend

from .serializers import item_serializer
from .models import item

class item_ViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]


    queryset = item.objects.all()
    serializer_class = item_serializer

    def get_queryset(self):
        status_filter = self.request.query_params.get('status', None)

        if status_filter is not None:
            return self.request.user.items_created_by.all().filter(status=status_filter)
        return (self.request.user.items_created_by.all()).order_by('-created_on')
        
    def perform_create(self, serializer):
        serializer.save(created_by=self.request.user)

    def list(self, request):
        queryset = self.get_queryset()
        serializer = item_serializer(queryset, many=True)
        return Response(serializer.data)
