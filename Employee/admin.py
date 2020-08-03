from django.contrib import admin
from .models import *

admin.site.register(Leave)
admin.site.register(LeaveApproval)
admin.site.register(Approval)


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'staff_id', 'is_employee', 'is_employer',)
    list_filter = ('first_name', 'email', 'staff_id',)
    search_fields = ('staff_id', 'first_name',)
    list_display_links = ('email',)



