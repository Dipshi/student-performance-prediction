# Generated by Django 2.1.7 on 2019-03-02 15:09

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='userRegister',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('FirstName', models.CharField(max_length=250)),
                ('Email', models.CharField(max_length=250)),
                ('Password', models.CharField(max_length=250)),
            ],
        ),
    ]
