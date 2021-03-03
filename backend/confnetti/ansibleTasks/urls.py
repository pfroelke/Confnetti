from django.urls import path
from .views import (
    AnsibleTaskView,
    AnsiblePlaybookOnlyView,
    SinglePlaybookView,
    RunSinglePlaybookView,
    HostsView,
    RawYmlView,
)

urlpatterns = [
    path("", AnsibleTaskView.as_view(), name="home"),
    path("playbooks", AnsiblePlaybookOnlyView.as_view()),
    path("pb/<playbookname>", SinglePlaybookView.as_view()),
    path("pbrun/<playbookname>", RunSinglePlaybookView.as_view()),
    path("hosts", HostsView.as_view()),
    path("raw-yml", RawYmlView.as_view()),
]
