from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import AnsibleTaskSerializer
from .models import AnsibleTask
from rest_framework import generics, status
from rest_framework.response import Response
import html, json, subprocess
import requests
from random import randrange
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
import ntpath
from django.core.files import File
import os


class AnsibleTaskView(generics.ListCreateAPIView):
    # upload and run playbook, passing to runner
    queryset = AnsibleTask.objects.all()
    serializer_class = AnsibleTaskSerializer

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        file = request.data["image"]
        created_record = AnsibleTask.objects.create(file=file)
        created_file = created_record.file
        created_task_id = created_record.id
        ansible_json = {
            "task_id": created_task_id,
        }
        playbook_file = {"playbook_file": open(created_file.path, "rb")}
        ret = requests.post(
            url="http://cfg-mgnt:8000/api/v1/", data=ansible_json, files=playbook_file
        )
        print("<debug>")
        print(ret.content)
        return Response(ret.content, status=status.HTTP_201_CREATED)


class AnsiblePlaybookOnlyView(generics.ListCreateAPIView):
    # get playbooks list

    queryset = AnsibleTask.objects.all()
    serializer_class = AnsibleTaskSerializer

    @csrf_exempt
    def get(self, request, *args, **kwargs):
        print("<get AnsiblePlaybookOnlyView>")
        playbooks = AnsibleTask.objects.all()
        print(f"<count: {len(playbooks)}>")
        playbooks_file_list = list()
        for x in playbooks:
            if not x.file.name:
                a = {"filename": "none"}
            else:
                a = {"filename": ntpath.basename(str(x.file.name))}
            playbooks_file_list.append(a)
        response = {"files": playbooks_file_list}
        print(response)
        response_json = json.dumps(response)
        return Response(response_json, status=status.HTTP_200_OK)


class SinglePlaybookView(generics.ListCreateAPIView):
    queryset = AnsibleTask.objects.all()
    serializer_class = AnsibleTaskSerializer

    @csrf_exempt
    def delete(self, request, playbookname, *args, **kwargs):
        print("<get AnsiblePlaybookOnlyView>")
        playbooks = AnsibleTask.objects.all()
        print(f"<count: {len(playbooks)}>")
        playbooks_file_list = list()
        for x in playbooks:
            if not x.file.name:
                a = None
            else:
                a = ntpath.basename(str(x.file.name))
            if a == playbookname:
                print("<found playbook, will remove>")
                # print(x.file.file)
                if os.path.isfile(x.file.path):
                    print("<file exist>")
                    os.remove(x.file.path)
                    print("<deleted file>")
                x.delete()
                print("<deleted record>")
                return Response({"deleted successfully"}, status=status.HTTP_200_OK)
        return Response({"deleted successfully"}, status=status.HTTP_200_OK)

    @csrf_exempt
    def get(self, request, playbookname, *args, **kwargs):
        playbooks = AnsibleTask.objects.all()
        for x in playbooks:
            if not x.file.name:
                a = None
            else:
                a = ntpath.basename(str(x.file.name))
            if a == playbookname:
                print("<found playbook, returning content>")
                print(x.file.file)
                return Response(x.file.file, status=status.HTTP_200_OK)
        return JsonResponse({})


class RunSinglePlaybookView(generics.ListCreateAPIView):
    queryset = AnsibleTask.objects.all()
    serializer_class = AnsibleTaskSerializer

    @csrf_exempt
    def get(self, request, playbookname, *args, **kwargs):
        print(f"<run file from list: {playbookname}>")

        playbooks = AnsibleTask.objects.all()
        playbook_file_path = None
        for x in playbooks:
            if not x.file.name:
                a = None
            else:
                a = ntpath.basename(str(x.file.name))
            if a == playbookname:
                print("<got_you>")
                playbook_file_path = x.file.path

        ansible_json = {
            "task_id": 0,
        }
        playbook_file = {"playbook_file": open(playbook_file_path, "rb")}
        ret = requests.post(url="http://cfg-mgnt:8000/api/v1/", files=playbook_file)
        print("<debug after run playbook>")
        return Response(ret.content, status=status.HTTP_201_CREATED)


class HostsView(generics.ListCreateAPIView):
    @csrf_exempt
    def get(self, request, *args, **kwargs):
        ret = requests.get(url="http://cfg-mgnt:8000/api/v1/hosts/",)
        return Response(ret.content, status=status.HTTP_200_OK)

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        file = request.data["raw_hosts"]
        hosts_file = {"hosts_file": file}
        ret = requests.post(url="http://cfg-mgnt:8000/api/v1/hosts/", data=request.data)
        return Response(ret.content, status=status.HTTP_201_CREATED)


class RawYmlView(generics.ListCreateAPIView):
    @csrf_exempt
    def post(self, request, *args, **kwargs):
        file_temp = open(request.data["playbook_name"], "w")
        file_temp.write(request.data["raw_yml"])
        file_temp.close()
        playbooks = AnsibleTask.objects.all()
        print(f"<count: {len(playbooks)}>")
        playbook_already_in_db = False
        record_in_db = None
        for x in playbooks:
            if ntpath.basename(str(x.file.name)) == request.data["playbook_name"]:
                playbook_already_in_db = True
                record_in_db = x
                break
        if playbook_already_in_db:
            with open(record_in_db.file.path, "w") as f:
                f.write(request.data["raw_yml"])
            print("<updated record>" + request.data["playbook_name"])
            return Response(
                "playbook updated in database", status=status.HTTP_201_CREATED
            )
        else:
            print("<new record>" + request.data["playbook_name"])
            with open(request.data["playbook_name"]) as f:
                created_record = AnsibleTask.objects.create(
                    file=File(f, request.data["playbook_name"])
                )
            return Response(
                "playbook added to database", status=status.HTTP_201_CREATED
            )