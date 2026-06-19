from django.urls import path
from .views import (
    ContactMessageCreateView, 
    ResumeView, 
    VisitorStatsView, 
    ReviewListCreateView, 
    GithubSvgView,
    GithubContributionsView
)

urlpatterns = [
    path('', ContactMessageCreateView.as_view(), name='contact-create'),
    path('resume/', ResumeView.as_view(), name='resume-api'),
    path('stats/', VisitorStatsView.as_view(), name='visitor-stats'),
    path('reviews/', ReviewListCreateView.as_view(), name='reviews-api'),
    path('github-svg/', GithubSvgView.as_view(), name='github-svg'),
    path('github-contributions/', GithubContributionsView.as_view(), name='github-contributions'),
]


