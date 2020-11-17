from django.views.generic import ListView
from .models import Playbook, AnsibleTask
from rest_framework import generics, status
from .serializers import TaskSerializer
from.ansible_processor import AnsibleProcessor
from rest_framework.response import Response
import os

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
        task_name = os.path.basename(AnsibleTask.objects.last().playbook_file.name)
        ap = AnsibleProcessor()
        status2 = ap.run_ansible_task(task_name)

        return Response(str(status2), status=status.HTTP_201_CREATED, headers=headers)


