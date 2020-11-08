from django.views.generic import ListView
from .models import Playbook, AnsibleTask
from django.forms import forms
from rest_framework import generics, status
from .serializers import TaskSerializer
from.ansible_processor import AnsibleProcessor
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
import time

class PlaybookView(ListView):
    model = Playbook
    template_name = 'playbooks/playbook_list.html'


class PlaybookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = AnsibleTask.objects.all()
    serializer_class = TaskSerializer


class TaskView(generics.ListCreateAPIView):
    queryset = AnsibleTask.objects.all()
    serializer_class = TaskSerializer

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        ap = AnsibleProcessor()
        ap.start_remaining_tasks()

        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)


