from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    path('start',views.start_vagrant, name="start_vagrant"),
]