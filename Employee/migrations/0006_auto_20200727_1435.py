# Generated by Django 3.0.8 on 2020-07-27 10:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Employee', '0005_auto_20200726_0037'),
    ]

    operations = [
        migrations.AlterField(
            model_name='user',
            name='phone_number',
            field=models.CharField(blank=True, max_length=100, null=True),
        ),
    ]
