from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import MgntTask

class MgntTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = MgntTask
        fields = ['id', 'name', 'desc']