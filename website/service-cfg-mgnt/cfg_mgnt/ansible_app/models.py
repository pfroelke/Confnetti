from django.db import models


class Playbook(models.Model):
    id = models.IntegerField(primary_key=True)
    filename = models.CharField(max_length=250)

    def __str__(self):
        return self.id


class AnsibleTask(models.Model):
    task_id = models.IntegerField(primary_key=True)
    playbook_id = models.IntegerField()
    playbook_name = models.CharField(max_length=250)
    hosts_group_id = models.IntegerField(blank=True, default=0)
    created = models.DateTimeField(blank=True, auto_now_add=True)
    finished = models.DateTimeField(blank=True, null=True, default=None)
    status = models.CharField(max_length=30, default="queued", unique=False)
    playbook_file = models.FileField(null=True, blank=True, upload_to="")

    def __str__(self):
        return str(self.task_id)
