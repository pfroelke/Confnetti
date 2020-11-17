from django.db import models


# Create your models here.
class AnsibleTask(models.Model):
    file = models.FileField(null=True, blank=True)
