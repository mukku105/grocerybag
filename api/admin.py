from django.contrib import admin
from .models import *

class item_admin(admin.ModelAdmin):
    list_display = ('id', 'name', 'description', 'quantity', 'quantity_unit', 'price', 'total_amount', 'status', 'scheduled_date', 'created_on','updated_on', 'created_by')
    list_display_links = ('id', 'name')
    list_filter = ('status',)
    search_fields = ('name', 'description', 'status')
    list_per_page = 25


admin.site.register(item, item_admin)