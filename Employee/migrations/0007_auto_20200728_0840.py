# Generated by Django 3.0.8 on 2020-07-28 04:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Employee', '0006_auto_20200727_1435'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='gender',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
