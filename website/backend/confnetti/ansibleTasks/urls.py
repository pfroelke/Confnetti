from django.urls import path
from .views import AnsibleTaskView,  AnsiblePlaybookOnlyView

urlpatterns = [
    path("", AnsibleTaskView.as_view(), name='home'),
    path("playbooks", AnsiblePlaybookOnlyView.as_view())
]
