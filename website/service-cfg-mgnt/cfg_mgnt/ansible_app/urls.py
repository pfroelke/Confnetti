from django.urls import path

from .views import PlaybookView

urlpatterns = [
    path('', PlaybookView.as_view(), name='home')
]
