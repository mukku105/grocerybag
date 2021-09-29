from django.urls import path, include
from rest_framework import routers
from . import views

router = routers.DefaultRouter()
router.register(r'grocery-bag', views.item_ViewSet)

urlpatterns = [
    path('', include(router.urls)),
    # path('view-bag/', views.View_list_APIView.as_view())
    
    path('api-auth', include('rest_framework.urls', namespace='rest_framework')),
]