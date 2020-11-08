from django.urls import path,re_path

from .views import TaskView, PlaybookDetail


urlpatterns = [
    path('', TaskView.as_view(), name='home'),
]