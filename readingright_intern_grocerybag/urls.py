"""
readingright_intern_grocerybag URL Configuration
"""
from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('', include('frontend.urls')),
    path('', include('accounts.urls')),
    path('api/', include('api.urls')),
    path('admin/', admin.site.urls),
]
