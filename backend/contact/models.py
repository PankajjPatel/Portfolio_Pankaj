from django.db import models

class ContactMessage(models.Model):
    name = models.CharField(max_length=150)
    email = models.EmailField()
    subject = models.CharField(max_length=250)
    message = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.subject}"


class PortfolioStats(models.Model):
    total_visits = models.IntegerField(default=0)
    unique_visitors = models.IntegerField(default=0)
    resume_downloads = models.IntegerField(default=0)

    class Meta:
        verbose_name = "Portfolio Stats"
        verbose_name_plural = "Portfolio Stats"

    def __str__(self):
        return f"Visits: {self.total_visits} | Unique: {self.unique_visitors} | Downloads: {self.resume_downloads}"


class Review(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    rating = models.IntegerField(default=5)
    comment = models.TextField()
    is_approved = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.name} - {self.rating} Stars"


