from django.views.generic import ListView
from .models import Playbook, AnsibleTask
from rest_framework import generics, status
from .serializers import TaskSerializer, PlaybookSerializer
from .ansible_processor import AnsibleProcessor
from rest_framework.response import Response
from django.http import JsonResponse, HttpResponse
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os
import json
import ntpath


class PlaybookView(ListView):
    model = Playbook
    template_name = "playbooks/playbook_list.html"


class PlaybookDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = AnsibleTask.objects.all()
    serializer_class = TaskSerializer


class TaskView(generics.ListCreateAPIView):
    # queryset = AnsibleTask.objects.all()
    # serializer_class = TaskSerializer

    def get(self, request, *args, **kwargs):
        return HttpResponse("<h1>TaskViewGet</h1>")

    def create(self, request, *args, **kwargs):
        # serializer = self.get_serializer(data=request.data)
        received_file = request.FILES["playbook_file"]
        received_file_name = received_file.name
        default_storage.save(
            "/".join(
                [
                    "service-cfg-mgnt",
                    "cfg_mgnt",
                    "ansible_data_dir",
                    "project",
                    received_file_name,
                ]
            ),
            ContentFile(received_file.read()),
        )
        ap = AnsibleProcessor()
        ansible_task_status, ansible_task_result = ap.run_ansible_task(
            received_file_name
        )
        return HttpResponse(
            f"playbook finished with status: {ansible_task_status}"
            + str(ansible_task_result),
            status=status.HTTP_201_CREATED,
        )


class HostsView(generics.ListCreateAPIView):
    # queryset = AnsibleTask.objects.all()
    # serializer_class = TaskSerializer

    def get(self, request, *args, **kwargs):

        hosts_path = "/".join(
            ["service-cfg-mgnt", "cfg_mgnt", "ansible_data_dir", "inventory", "hosts",]
        )
        f = open(hosts_path, "r")
        print("<debug_hosts>")
        return HttpResponse(f, status=status.HTTP_200_OK)

    def create(self, request, *args, **kwargs):
        # serializer = self.get_serializer(data=request.ata)

        print(request.data["raw_hosts"])
        received_file_name = "hosts"
        default_storage.delete(
            "/".join(
                [
                    "service-cfg-mgnt",
                    "cfg_mgnt",
                    "ansible_data_dir",
                    "inventory",
                    received_file_name,
                ]
            ),
        )

        default_storage.save(
            "/".join(
                [
                    "service-cfg-mgnt",
                    "cfg_mgnt",
                    "ansible_data_dir",
                    "inventory",
                    received_file_name,
                ]
            ),
            ContentFile(request.data["raw_hosts"]),
        )
        return Response("hosts file changed", status=status.HTTP_201_CREATED)
