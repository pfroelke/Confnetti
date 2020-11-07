from django.views.generic import ListView
from .models import Playbook


class PlaybookView(ListView):
    model = Playbook
    template_name = 'playbooks/playbook_list.html'
