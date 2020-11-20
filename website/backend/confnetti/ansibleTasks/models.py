from django.db import models


def upload_path(instance, filename):
    return "/".join(["playbooks", filename])


# Create your models here.
class AnsibleTask(models.Model):

    file = models.FileField(null=True, blank=True, upload_to=upload_path)
