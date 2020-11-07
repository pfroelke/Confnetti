from django.db import models


class Playbook(models.Model):
    name = models.CharField(max_length=250)
    created = models.CharField(max_length=250)

    def __str__(self):
        return self.name
