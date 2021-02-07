from rest_framework import generics

from ansible_app.models import Playbook
from .serializers import PlaybookSerializer


class PlaybookAPIView(generics.ListAPIView):
    queryset = Playbook.objects.all()
    serializer_class = PlaybookSerializer
