from django.urls import path,re_path

from .views import TaskView, PlaybooksView


urlpatterns = [
    path("xd", PlaybooksView.as_view()),
    path('', TaskView.as_view(), name='home'),
]