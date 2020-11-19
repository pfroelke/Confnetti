from django.contrib.auth.models import User, Group
from rest_framework import serializers
from .models import AnsibleTask


class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ['url', 'username', 'email', 'groups']


class TaskSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('task_id', 'playbook_id', 'playbook_name', 'playbook_file')
        model = AnsibleTask


class PlaybookSerializer(serializers.ModelSerializer):

    class Meta:
        fields = ('playbook_file',)
        model = AnsibleTask