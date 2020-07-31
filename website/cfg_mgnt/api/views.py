from django.contrib.auth.models import User, Group
from rest_framework import viewsets
from rest_framework import permissions
from .serializers import MgntTaskSerializer
from .models import MgntTask


class MgntTaskViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = MgntTaskSerializer