# from rest_framework.views import APIView
# from rest_framework.response import Response
# from .serializers import TaskSerializer
from .models import AnsibleTask

import json
import shutil
import ansible_runner


class AnsibleProcessor:
    def start_remaining_tasks(self):
        db_ansible_tasks = AnsibleTask.objects.all()
        for db_ansible_task in db_ansible_tasks:
            if db_ansible_task.status == "queued":
                db_ansible_task.status = "processing"
                db_ansible_task.save()
                print("now task being processed")
                self.run_ansible_task()

    def run_ansible_task(self, playbook_name):
        r = ansible_runner.run(
            private_data_dir="/code/ansible_data_dir",
            playbook=playbook_name,
        )
        print("{}: {}".format(r.status, r.rc))
        return r.status, open(r.stdout.name, "r").read()

# AnsibleProcessor.run_ansible_task()
