# Generated by Django 5.2.3 on 2025-07-03 00:02

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0004_category_meal'),
    ]

    operations = [
        migrations.AlterField(
            model_name='meal',
            name='category',
            field=models.CharField(choices=[('Breakfast', 'Breakfast'), ('Lunch', 'Lunch'), ('Dinner', 'Dinner'), ('Snack', 'Snack')]),
        ),
        migrations.AlterField(
            model_name='meal',
            name='description',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='meal',
            name='ingredients',
            field=models.TextField(),
        ),
        migrations.DeleteModel(
            name='Category',
        ),
    ]
