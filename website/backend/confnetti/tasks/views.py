from django.http.response import JsonResponse
from rest_framework import status
from rest_framework.decorators import api_view
from .serializers import TaskSerializer
from .models import Task
import html, json, subprocess


# Create your views here.


@api_view(["POST"])
def task(request):
    data = json.loads(request.body)
    serializer = TaskSerializer(data=data)
    if serializer.is_valid():
        task = Task(**serializer.validated_data)
        # shell=True potentially unsafe
        # Do we need universal newlines? deprecated!
        result = subprocess.run(
            task.desc, capture_output=True, shell=True, universal_newlines=True
        )
        return JsonResponse(
            {
                "stdout": html.escape(result.stdout),
                "stderr": html.escape(result.stderr),
            },
            status=status.HTTP_200_OK,
        )
    return JsonResponse(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
