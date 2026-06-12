from rest_framework import serializers
from .models import ContactMessage, Review

class ContactMessageSerializer(serializers.ModelSerializer):
    subject = serializers.CharField(required=False, allow_blank=True, default='')

    class Meta:
        model = ContactMessage
        fields = ['id', 'name', 'email', 'subject', 'message', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Name cannot be empty.")
        if len(value) < 2:
            raise serializers.ValidationError("Name must be at least 2 characters long.")
        return value

    def validate_message(self, value):
        if not value.strip():
            raise serializers.ValidationError("Message cannot be empty.")
        if len(value) < 10:
            raise serializers.ValidationError("Message must be at least 10 characters long.")
        return value

    def validate(self, data):
        # If subject is not provided, generate a default one
        if not data.get('subject') or not data['subject'].strip():
            name = data.get('name', 'Anonymous')
            data['subject'] = f"Portfolio Message from {name}"
        return data


class ReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = Review
        fields = ['id', 'name', 'email', 'rating', 'comment', 'created_at']
        read_only_fields = ['id', 'created_at']

    def validate_name(self, value):
        if not value.strip():
            raise serializers.ValidationError("Name cannot be empty.")
        return value

    def validate_rating(self, value):
        if value < 1 or value > 5:
            raise serializers.ValidationError("Rating must be between 1 and 5.")
        return value

    def validate_comment(self, value):
        if not value.strip():
            raise serializers.ValidationError("Review comment cannot be empty.")
        return value

