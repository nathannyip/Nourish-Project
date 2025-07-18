# Generated by Django 5.2.3 on 2025-07-08 20:11

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0011_meal_creator'),
    ]

    operations = [
        migrations.CreateModel(
            name='MealLog',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date_logged', models.DateTimeField(default=django.utils.timezone.now)),
                ('meal', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='users.meal')),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='meal_log', to='users.profile')),
            ],
        ),
    ]
