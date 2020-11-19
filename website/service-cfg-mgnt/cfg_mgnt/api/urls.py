from django.urls import path, include
from .views import PlaybookAPIView

urlpatterns = [
    path('', PlaybookAPIView.as_view()),
    path('v1/', include('ansible_app.urls'))
]
