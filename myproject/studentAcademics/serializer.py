from rest_framework import  serializers
from django.contrib.auth.models import User
from studentAcademics.models import studentAcademics
from django.contrib.auth.models import User

class studentAcaSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(read_only=True)
    class Meta:
        model = studentAcademics
        fields = '__all__'
  