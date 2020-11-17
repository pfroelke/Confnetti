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

import base64
# Create your views here.


@api_view(["POST"])
def task(request):
    """
    payload = {
        'task_id': randrange(0,10000),
        'playbook_id': '1',
        'playbook_name': "iksde",
        'playbook_file': request.FILES['image'],
    }
    """
    f = request.FILES['image']
    with open("temp.yml", 'wb') as dest:
        for chunk in f.chunks():
            dest.write(chunk)
    print("<debug-after-write>")
    #print(payload)
    ret = requests.get("http://cfg-mgnt:8000/api/v1")
    return JsonResponse(
        {
        },
        status=status.HTTP_200_OK,
    )
