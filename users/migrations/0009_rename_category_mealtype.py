# Generated by Django 5.2.3 on 2025-07-03 03:19

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0008_category_remove_meal_category_meal_category'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='Category',
            new_name='MealType',
        ),
    ]
