from rest_framework import  serializers
from stuData.models import stuData
from django.contrib.auth.models import User

class UserDataSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(read_only=True)
    class Meta:
        model = stuData
        fields = '__all__'