from rest_framework import  serializers
from studentData.models import studentData
from django.contrib.auth.models import User

class UserDataSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(read_only=True)
    class Meta:
        model = studentData
        fields = '__all__'