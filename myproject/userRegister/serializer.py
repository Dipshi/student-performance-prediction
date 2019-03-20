# from userRegister.models import userRegister
from rest_framework import  serializers
from django.contrib.auth.models import User
from studentAcademics.models import studentAcademics
from django.contrib.auth.models import User

class UserRegSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(read_only=True)
    class Meta:
        model = User
        fields = '__all__'
        


    # FirstName = serializers.CharField(max_length= 250)
    # Email=serializers.CharField(max_length= 250)
    # Password=serializers.CharField(max_length= 250)
    # extra_kwargs = {'password': {'write_only': True}}
    # def create(self,validated_data):
    #     print(validated_data)
    #     is_new = self.pk is None
    #     user=User.objects.create(**validated_data)
    #     # user=userRegister.objects.create(Email=validated_data.get('email'),
    #     # FirstName=validated_data.get('firstName'),
    #     # Password=validated_data.get('password'))
    #     user.save()
    #     if is_new:
    #         cd = studentAcademics()
    #         # cd.amount = ....
    #         cd.save()

    #     return user