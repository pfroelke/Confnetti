from django.contrib import admin
from .models import Playbook, AnsibleTask

admin.site.register(Playbook)
admin.site.register(AnsibleTask)
