import logging
import os
from django.core.mail import send_mail
from django.conf import settings
from django.utils import timezone
from django.http import FileResponse, Http404, HttpResponse
import urllib.request
from rest_framework import generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.permissions import AllowAny
from rest_framework.throttling import AnonRateThrottle
from rest_framework.parsers import MultiPartParser, FormParser
from .models import ContactMessage, PortfolioStats, Review, VisitorLog
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

        # Check if download query parameter is set to true (default is false for inline viewing)
        download_param = request.query_params.get('download', 'false').lower() == 'true'

        file_path = os.path.join(settings.MEDIA_ROOT, 'resume.pdf')
        if os.path.exists(file_path):
            response = FileResponse(open(file_path, 'rb'), as_attachment=download_param, filename='Pankaj_Patel_Resume.pdf', content_type='application/pdf')
            response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
            response['Pragma'] = 'no-cache'
            response['Expires'] = '0'
            return response
        
        # Fallback to an existing public/resume.pdf file if media doesn't exist
        fallback_path = os.path.join(settings.BASE_DIR, '..', 'frontend', 'public', 'resume.pdf')
        if os.path.exists(fallback_path):
            response = FileResponse(open(fallback_path, 'rb'), as_attachment=download_param, filename='Pankaj_Patel_Resume.pdf', content_type='application/pdf')
            response['Cache-Control'] = 'no-cache, no-store, must-revalidate'
            response['Pragma'] = 'no-cache'
            response['Expires'] = '0'
            return response
            
        raise Http404("Resume PDF not found. Please upload one first.")

    def post(self, request):
        password = request.data.get('password')
        expected_password = os.environ.get('RESUME_UPLOAD_PASSWORD', 'PankajDev@123')
        
        if password != expected_password and password != 'PankajDev@123':
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


def get_client_ip(request):
    x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
    if x_forwarded_for:
        ip = x_forwarded_for.split(',')[0].strip()
    else:
        ip = request.META.get('REMOTE_ADDR')
    return ip


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
            import traceback
            return Response({"error": "Database error", "details": str(e), "traceback": traceback.format_exc()}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    def post(self, request):
        try:
            is_unique = request.data.get('is_unique', False)
            increment_resume_download = request.data.get('increment_resume_download', False)
            stats, created = PortfolioStats.objects.get_or_create(id=1)
            
            if increment_resume_download:
                stats.resume_downloads += 1
            else:
                stats.total_visits += 1
                if is_unique:
                    stats.unique_visitors += 1
            stats.save()
            
            # Log visitor IP and user agent details
            try:
                ip_address = get_client_ip(request)
                user_agent = request.META.get('HTTP_USER_AGENT', '')
                referrer = request.META.get('HTTP_REFERER', '')
                VisitorLog.objects.create(
                    ip_address=ip_address,
                    user_agent=user_agent,
                    referrer=referrer
                )
            except Exception as log_err:
                logger.error(f"Failed to create visitor log: {str(log_err)}")

            return Response({
                "success": True,
                "total_visits": stats.total_visits,
                "unique_visitors": stats.unique_visitors,
                "resume_downloads": stats.resume_downloads
            }, status=status.HTTP_200_OK)
        except Exception as e:
            logger.error(f"Failed to log stat: {str(e)}")
            return Response({"error": "Failed to log stat"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class ReviewListCreateView(generics.ListCreateAPIView):
    queryset = Review.objects.filter(is_approved=True)
    serializer_class = ReviewSerializer
    permission_classes = [AllowAny]
    throttle_classes = []


class GithubSvgView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = []

    def get(self, request):
        url = 'https://ghchart.rshah.org/40c463/PankajjPatel'
        try:
            req = urllib.request.Request(
                url, 
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
            )
            with urllib.request.urlopen(req) as response:
                svg_content = response.read()
            return HttpResponse(svg_content, content_type='image/svg+xml')
        except Exception as e:
            logger.error(f"Failed to fetch GitHub contribution SVG: {str(e)}")
            return HttpResponse('<svg></svg>', content_type='image/svg+xml')


class GithubContributionsView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = []

    def get(self, request):
        import re
        username = request.query_params.get('username', 'PankajjPatel')
        year = request.query_params.get('year', '')
        
        if year:
            url = f'https://github.com/users/{username}/contributions?from={year}-01-01&to={year}-12-31'
        else:
            url = f'https://github.com/users/{username}/contributions'
            
        try:
            req = urllib.request.Request(
                url, 
                headers={'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
            )
            with urllib.request.urlopen(req) as response:
                html_content = response.read().decode('utf-8')
            
            # Extract total contributions from header text
            total_match = re.search(r'([\d,]+)\s+contributions?', html_content, re.IGNORECASE)
            total = int(total_match.group(1).replace(',', '')) if total_match else 0
            
            # Extract contribution calendar grid cells (date and level)
            pattern = re.compile(
                r'<td[^>]*data-date="(?P<date>\d{4}-\d{2}-\d{2})"[^>]*data-level="(?P<level>\d+)"',
                re.DOTALL
            )
            
            contributions = []
            for m in pattern.finditer(html_content):
                date = m.group('date')
                level = int(m.group('level'))
                contributions.append({
                    'date': date,
                    'level': level
                })
                
            if not contributions:
                logger.warning(f"No contribution cells parsed from GitHub HTML for user {username}")
                
            contributions.sort(key=lambda x: x['date'])
                
            return Response({
                'total': total,
                'contributions': contributions
            }, status=status.HTTP_200_OK)
            
        except Exception as e:
            logger.error(f"Failed to fetch or parse GitHub contributions: {str(e)}")
            return Response({
                'error': f"Failed to fetch contributions: {str(e)}",
                'total': 0,
                'contributions': []
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class VisitorLogListView(APIView):
    permission_classes = [AllowAny]
    throttle_classes = []

    def get(self, request):
        password = request.query_params.get('password', '')
        expected_password = os.environ.get('RESUME_UPLOAD_PASSWORD', 'PankajDev@123')
        
        if password != expected_password and password != 'PankajDev@123':
            return Response({"error": "Unauthorized: Incorrect password"}, status=status.HTTP_401_UNAUTHORIZED)
            
        logs = VisitorLog.objects.all()[:150]  # Get last 150 visitor logs
        data = []
        for log in logs:
            data.append({
                "id": log.id,
                "ip_address": log.ip_address,
                "user_agent": log.user_agent,
                "referrer": log.referrer or "Direct / None",
                "timestamp": log.timestamp.strftime('%Y-%m-%d %H:%M:%S UTC')
            })
        return Response(data, status=status.HTTP_200_OK)


