from django.urls import path

from .views import TaskView, HostsView


urlpatterns = [
    path("", TaskView.as_view(), name="home"),
    path("hosts/", HostsView.as_view()),
]
