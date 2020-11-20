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


class AnsibleTaskView(generics.ListCreateAPIView):
    queryset = AnsibleTask.objects.all()
    serializer_class = AnsibleTaskSerializer

    @csrf_exempt
    def post(self, request, *args, **kwargs):
        file = request.data['image']
        created_file = AnsibleTask.objects.create(file=file).file
        ansible_json = {
            'task_id': randrange(1, 10000),
            'playbook_id': 1,
            'playbook_name': "random_name",
        }
        playbook_file = {'playbook_file': open(created_file.path, 'rb')}
        ret = requests.post(url="http://cfg-mgnt:8000/api/v1/", data=ansible_json, files=playbook_file)
        print("<debug>")
        print(ret.content)
        return Response(ret.content, status=status.HTTP_201_CREATED)

class AnsiblePlaybookOnlyView(generics.ListCreateAPIView):
    queryset = AnsibleTask.objects.all()
    serializer_class = AnsibleTaskSerializer

    @csrf_exempt
    def get(self, request, *args, **kwargs):
        response = requests.get(url="http://cfg-mgnt:8000/api/v1/xd",)
        print("XD")
        print (response.content)
        return Response(response.content, status=status.HTTP_200_OK)

class SinglePlaybookView(generics.ListCreateAPIView):
    queryset = AnsibleTask.objects.all()
    serializer_class = AnsibleTaskSerializer

    @csrf_exempt
    def get(self, request, playbookname, *args, **kwargs):
        print(f"<request for file {playbookname}>")
        response = requests.get(url=f"http://cfg-mgnt:8000/api/v1/pb/{playbookname}",)
        print("<content>")
        print (response.content)
        return Response(response.content, status=status.HTTP_200_OK)

class RunSinglePlaybookView(generics.ListCreateAPIView):
    queryset = AnsibleTask.objects.all()
    serializer_class = AnsibleTaskSerializer

    @csrf_exempt
    def get(self, request, playbookname, *args, **kwargs):
        print(f"<request for file {playbookname}>")
        response = requests.get(url=f"http://cfg-mgnt:8000/api/v1/pbrun/{playbookname}",)
        print("<content>")
        print (response.content)
        return Response(response.content, status=status.HTTP_200_OK)

