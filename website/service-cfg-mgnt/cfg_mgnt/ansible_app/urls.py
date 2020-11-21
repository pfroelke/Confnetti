from django.urls import path, re_path

from .views import TaskView


urlpatterns = [
    path("", TaskView.as_view(), name="home"),
]
