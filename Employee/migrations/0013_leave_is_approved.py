# Generated by Django 3.0.8 on 2020-07-31 18:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Employee', '0012_leave_admin_note'),
    ]

    operations = [
        migrations.AddField(
            model_name='leave',
            name='is_approved',
            field=models.BooleanField(default=False),
        ),
    ]
