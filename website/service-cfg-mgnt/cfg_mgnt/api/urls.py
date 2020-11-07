from django.urls import path
from .views import PlaybookAPIView

urlpatterns = [
    path('', PlaybookAPIView.as_view()),
]
