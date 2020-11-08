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
    created = models.DateTimeField(blank=True, auto_now_add=True)
    finished = models.DateTimeField(blank=True, null=True, default=None)
    status = models.CharField(max_length=30, default="queued")

    def __str__(self):
        return str(self.task_id)
