import logging
import os
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from django.http import FileResponse, Http404
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle
from rest_framework.parsers import MultiPartParser, FormParser
from .models import ContactMessage, PortfolioStats, Review
from .serializers import ContactMessageSerializer, ReviewSerializer


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


class ResumeView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = []
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        # Increment download statistics
        try:
            stats, created = PortfolioStats.objects.get_or_create(id=1)
            stats.resume_downloads += 1
            stats.save()
            logger.info(f"Resume download counter incremented to {stats.resume_downloads}")
        except Exception as e:
            logger.error(f"Failed to increment resume download counter: {str(e)}")

        file_path = os.path.join(settings.MEDIA_ROOT, 'resume.pdf')
        if os.path.exists(file_path):
            return FileResponse(open(file_path, 'rb'), content_type='application/pdf')
        
        # Fallback to an existing public/resume.pdf file if media doesn't exist
        fallback_path = os.path.join(settings.BASE_DIR, '..', 'frontend', 'public', 'resume.pdf')
        if os.path.exists(fallback_path):
            return FileResponse(open(fallback_path, 'rb'), content_type='application/pdf')
            
        raise Http404("Resume PDF not found. Please upload one first.")

    def post(self, request):
        password = request.data.get('password')
        expected_password = os.environ.get('RESUME_UPLOAD_PASSWORD', 'PankajResume2026')
        
        if password != expected_password:
            return Response({"error": "Unauthorized: Incorrect password"}, status=status.HTTP_401_UNAUTHORIZED)

        file_obj = request.FILES.get('file')
        if not file_obj:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        if not file_obj.name.lower().endswith('.pdf'):
            return Response({"error": "Only PDF files are allowed"}, status=status.HTTP_400_BAD_REQUEST)

        # Save the file to media/resume.pdf
        os.makedirs(settings.MEDIA_ROOT, exist_ok=True)
        file_path = os.path.join(settings.MEDIA_ROOT, 'resume.pdf')
        with open(file_path, 'wb+') as destination:
            for chunk in file_obj.chunks():
                destination.write(chunk)

        # Also copy it to the frontend public directory if it exists, so Vite can serve it statically
        try:
            frontend_public_dir = os.path.join(settings.BASE_DIR, '..', 'frontend', 'public')
            if os.path.exists(frontend_public_dir):
                frontend_file_path = os.path.join(frontend_public_dir, 'resume.pdf')
                with open(frontend_file_path, 'wb+') as destination_front:
                    file_obj.seek(0)
                    for chunk in file_obj.chunks():
                        destination_front.write(chunk)
                logger.info("Successfully copied resume.pdf to frontend public folder")
        except Exception as e:
            logger.error(f"Failed to copy resume to frontend public folder: {str(e)}")

        return Response({"success": "Resume uploaded successfully"}, status=status.HTTP_200_OK)


class VisitorStatsView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = []

    def get(self, request):
        try:
            stats, created = PortfolioStats.objects.get_or_create(id=1)
            return Response({
                "total_visits": stats.total_visits,
                "unique_visitors": stats.unique_visitors,
                "resume_downloads": stats.resume_downloads
            }, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Failed to fetch stats: {str(e)}")
            return Response({"error": "Database error"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            is_unique = request.data.get('is_unique', False)
            stats, created = PortfolioStats.objects.get_or_create(id=1)
            
            stats.total_visits += 1
            if is_unique:
                stats.unique_visitors += 1
            stats.save()
            
            return Response({
                "success": True,
                "total_visits": stats.total_visits,
                "unique_visitors": stats.unique_visitors
            }, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Failed to log visit: {str(e)}")
            return Response({"error": "Failed to log visit"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ReviewListCreateView(generics.ListCreateAPIView):
    queryset = Review.objects.filter(is_approved=True)
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]
    throttle_classes = []

