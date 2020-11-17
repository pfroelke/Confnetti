from django.urls import path
from .views import AnsibleTaskView

urlpatterns = [
    path("", AnsibleTaskView.as_view(), name='home'),
]
