from django.db import models

class MgntTask(models.Model):
    name = models.CharField(max_length=32)
    desc = models.CharField(max_length=256)