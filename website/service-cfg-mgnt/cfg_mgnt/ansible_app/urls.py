from django.urls import path,re_path

from .views import TaskView, PlaybooksView, SinglePlaybookView, RunSinglePlaybookView


urlpatterns = [
    path("xd", PlaybooksView.as_view()),
    path('', TaskView.as_view(), name='home'),
    path("pb/<playbookname>/", SinglePlaybookView.as_view()),
    path("pbrun/<playbookname>/", RunSinglePlaybookView.as_view())
]