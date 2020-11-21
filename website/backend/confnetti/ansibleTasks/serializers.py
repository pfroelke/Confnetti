from rest_framework import serializers
from .models import AnsibleTask


class AnsibleTaskSerializer(serializers.ModelSerializer):
    class Meta:
        model = AnsibleTask
        fields = ["id", "file"]
