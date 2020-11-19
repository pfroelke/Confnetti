from django.views.generic import ListView
from .models import Playbook, AnsibleTask
from rest_framework import generics, status
from .serializers import TaskSerializer, PlaybookSerializer
from.ansible_processor import AnsibleProcessor
from rest_framework.response import Response
import os
import json

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


class PlaybooksView(generics.ListCreateAPIView):
    queryset = AnsibleTask.objects.all()
    serializer_class = PlaybookSerializer

    def get(self, request, *args, **kwargs):
        playbooks = AnsibleTask.objects.all()
        playbooks_file_list=list()
        for x in playbooks:
            playbooks_file_list.append(str(x.playbook_file.name))
        response = {
            "files": playbooks_file_list,
        }

        return Response(json.dumps(response), status=status.HTTP_201_CREATED)


