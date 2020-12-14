from rest_framework import serializers

from ansible_app.models import Playbook


class PlaybookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Playbook
        fields = ("id", "filename")
