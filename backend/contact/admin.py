from django.contrib import admin
from .models import ContactMessage, VisitorLog

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'subject', 'created_at')
    list_filter = ('created_at',)
    search_fields = ('name', 'email', 'subject', 'message')
    readonly_fields = ('name', 'email', 'subject', 'message', 'created_at')
    
    # Restrict permissions so messages can be viewed and deleted, but not edited
    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False


@admin.register(VisitorLog)
class VisitorLogAdmin(admin.ModelAdmin):
    list_display = ('ip_address', 'timestamp', 'user_agent_short', 'referrer_short')
    list_filter = ('timestamp',)
    search_fields = ('ip_address', 'user_agent', 'referrer')
    readonly_fields = ('ip_address', 'user_agent', 'referrer', 'timestamp')

    def user_agent_short(self, obj):
        return obj.user_agent[:60] + '...' if obj.user_agent and len(obj.user_agent) > 60 else obj.user_agent
    user_agent_short.short_description = 'User Agent'

    def referrer_short(self, obj):
        return obj.referrer[:40] + '...' if obj.referrer and len(obj.referrer) > 40 else obj.referrer
    referrer_short.short_description = 'Referrer'

    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False
