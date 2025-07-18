# Generated by Django 5.2.3 on 2025-06-26 18:08

import django.db.models.deletion
import django.utils.timezone
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_remove_profile_height_profile_height_ft_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='profile',
            name='activity_level',
            field=models.CharField(choices=[('sedentary', 'Sedentary'), ('lightly_active', 'Lightly Active'), ('moderately_active', 'Moderately Active'), ('very_active', 'Very Active')], default='sedentary'),
        ),
        migrations.AlterField(
            model_name='profile',
            name='gender',
            field=models.CharField(choices=[('male', 'Male'), ('female', 'Female')], default='male', max_length=20),
        ),
        migrations.AlterField(
            model_name='profile',
            name='goal',
            field=models.CharField(choices=[('lose_weight', 'Lose Weight'), ('gain_weight', 'Gain Weight'), ('maintain_weight', 'Maintain Weight')], default='maintain_weight', max_length=20),
        ),
        migrations.CreateModel(
            name='DailyProgress',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateField(default=django.utils.timezone.now)),
                ('calories', models.IntegerField(default=0)),
                ('protein', models.IntegerField(default=0)),
                ('carbs', models.IntegerField(default=0)),
                ('fat', models.IntegerField(default=0)),
                ('profile', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='daily_progress', to='users.profile')),
            ],
            options={
                'unique_together': {('profile', 'date')},
            },
        ),
    ]
