# from userRegister.models import userRegister
from rest_framework import  serializers
from django.contrib.auth.models import User
from studentAcademics.models import studentAcademics
from django.contrib.auth.models import User
from django.contrib.auth.hashers import make_password

class UserRegSerializer(serializers.ModelSerializer):
    # id = serializers.IntegerField(read_only=True)
    extra_kwargs = {'password': {'write_only': True}}
    class Meta:
        model = User
        fields = '__all__'
        
        


    # FirstName = serializers.CharField(max_length= 250)
    # Email=serializers.CharField(max_length= 250)
    # Password=serializers.CharField(max_length= 250)
    # extra_kwargs = {'password': {'write_only': True}}
#     def create(self,validated_data):
#         print(validated_data)
#         # is_new = self.pk is None
# #         User.objects.create(
# #         email=validated_data['email'],
# #         username=validated_data['username'],
# #         password = make_password(validated_data['password'])
# # # )
#         # user=User.objects.create(**validated_data)
#         user=User.objects.create(email=validated_data.get('email'),
#         username=validated_data.get('username'),
#         password=validated_data.get('password'))
#         user.save()

#         return user