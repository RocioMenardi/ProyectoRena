# Generated by Django 4.2 on 2024-09-04 19:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('producto', '0004_alter_tipoproducto_descripcion'),
    ]

    operations = [
        migrations.AddField(
            model_name='litro',
            name='activo',
            field=models.BooleanField(default=True),
        ),
    ]
