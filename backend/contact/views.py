import logging
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from rest_framework import generics
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle
from .models import ContactMessage
from .serializers import ContactMessageSerializer

logger = logging.getLogger(__name__)

class ContactMessageCreateView(generics.CreateAPIView):
    queryset = ContactMessage.objects.all()
    serializer_class = ContactMessageSerializer
    permission_classes = [AllowAny]
    throttle_classes = [AnonRateThrottle]

    def perform_create(self, serializer):
        # Save the contact message to the database first
        instance = serializer.save()
        
        # Trigger email notification asynchronously/safely
        self.send_email_notification(instance)

    def send_email_notification(self, instance):
        subject = f"New Portfolio Contact Request: {instance.subject}"
        
        # Get localized timestamp
        timestamp_str = timezone.now().strftime('%Y-%m-%d %H:%M:%S UTC')
        
        body = (
            f"You received a new message from your portfolio contact form:\n\n"
            f"Name: {instance.name}\n"
            f"Email: {instance.email}\n"
            f"Subject: {instance.subject}\n"
            f"Timestamp: {timestamp_str}\n\n"
            f"Message:\n"
            f"{instance.message}\n"
        )
        
        recipient = "Pankajlucky678@gmail.com"
        
        try:
            send_mail(
                subject=subject,
                message=body,
                from_email=settings.DEFAULT_FROM_EMAIL,
                recipient_list=[recipient],
                fail_silently=False,
            )
            logger.info(f"Email successfully sent to {recipient}")
        except Exception as e:
            # Log the error but don't fail the API request
            logger.error(f"Failed to send contact notification email: {str(e)}")
