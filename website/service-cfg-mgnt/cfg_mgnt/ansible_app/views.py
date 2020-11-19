from django.views.generic import ListView
from .models import Playbook, AnsibleTask
from rest_framework import generics, status
from .serializers import TaskSerializer, PlaybookSerializer
from.ansible_processor import AnsibleProcessor
from rest_framework.response import Response
from django.http import JsonResponse
import os
import json
import ntpath

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
        print("XDD")
        print(str(status2))
        print("XDD")

        return Response(str(status2), status=status.HTTP_201_CREATED, headers=headers)


class PlaybooksView(generics.ListCreateAPIView):
    queryset = AnsibleTask.objects.all()
    serializer_class = PlaybookSerializer

    def get(self, request, *args, **kwargs):
        playbooks = AnsibleTask.objects.all()
        playbooks_file_list=list()
        for x in playbooks:
            if not x.playbook_file.name:
                a = {"filename": "none"}
            else:
                a = {"filename": ntpath.basename(str(x.playbook_file.name))}
            playbooks_file_list.append(a)
        response = {"files": playbooks_file_list}
        print(response)
        print(json.dumps(response))

        return JsonResponse(response)


