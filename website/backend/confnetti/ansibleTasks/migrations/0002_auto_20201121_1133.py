# Generated by Django 3.0.8 on 2020-11-21 11:33

import confnetti.ansibleTasks.models
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("ansibleTasks", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="ansibletask",
            name="file",
            field=models.FileField(
                blank=True,
                null=True,
                upload_to=confnetti.ansibleTasks.models.upload_path,
            ),
        ),
        migrations.AlterField(
            model_name="ansibletask",
            name="id",
            field=models.AutoField(primary_key=True, serialize=False),
        ),
    ]