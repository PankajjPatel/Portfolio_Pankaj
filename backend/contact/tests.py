from django.urls import reverse
from django.core.cache import cache
from rest_framework import status
from rest_framework.test import APITestCase
from .models import ContactMessage

class ContactMessageAPITests(APITestCase):
    def setUp(self):
        cache.clear()
        self.contact_url = reverse('contact-create')
        self.valid_payload = {

            'name': 'John Doe',
            'email': 'john.doe@example.com',
            'subject': 'Collaborative Project Inquiry',
            'message': 'Hello Pankaj, I would like to discuss a potential project collaboration. Let me know when you are free.'
        }

    def test_create_contact_message_success(self):
        """Ensure we can create a new contact message and store it."""
        response = self.client.post(self.contact_url, self.valid_payload, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(ContactMessage.objects.count(), 1)
        
        saved_message = ContactMessage.objects.first()
        self.assertEqual(saved_message.name, 'John Doe')
        self.assertEqual(saved_message.email, 'john.doe@example.com')
        self.assertEqual(saved_message.subject, 'Collaborative Project Inquiry')

    def test_create_contact_message_invalid_email(self):
        """Ensure invalid email inputs fail validation."""
        invalid_payload = self.valid_payload.copy()
        invalid_payload['email'] = 'not-an-email'
        
        response = self.client.post(self.contact_url, invalid_payload, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('email', response.data)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_create_contact_message_short_name(self):
        """Ensure too-short names fail validation."""
        invalid_payload = self.valid_payload.copy()
        invalid_payload['name'] = 'J'
        
        response = self.client.post(self.contact_url, invalid_payload, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('name', response.data)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_create_contact_message_short_message(self):
        """Ensure too-short messages fail validation."""
        invalid_payload = self.valid_payload.copy()
        invalid_payload['message'] = 'Short'
        
        response = self.client.post(self.contact_url, invalid_payload, format='json')
        
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)
        self.assertIn('message', response.data)
        self.assertEqual(ContactMessage.objects.count(), 0)

    def test_rate_limiting(self):
        """Verify that multiple submissions from anonymous clients are eventually throttled."""
        # The throttle rate is set to 5/hour in settings.py, so the 6th call should be blocked.
        for i in range(5):
            response = self.client.post(self.contact_url, self.valid_payload, format='json')
            self.assertEqual(response.status_code, status.HTTP_201_CREATED)

        # 6th attempt should return 429 Too Many Requests
        response = self.client.post(self.contact_url, self.valid_payload, format='json')
        self.assertEqual(response.status_code, status.HTTP_429_TOO_MANY_REQUESTS)
