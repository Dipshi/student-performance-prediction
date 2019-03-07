from tastypie.resources import ModelResource
from userRegister.models import userRegister
from userRegister.models import studentData
from tastypie.authorization import Authorization
from django.contrib.auth.models import User
from tastypie.serializers import Serializer


class userRegisterResource(ModelResource):
    def dispatch_list(self, request, **kwargs):
        # TODO: Refactor this
        if request.method == "POST":
            return HttpResponse(True)
        return super(CarResource, self).dispatch_list(request, **kwargs)
    class Meta:

        queryset = userRegister.objects.all()
        resource_name = 'userRegisterData'
        # excludes= ["product", "price"]
        allowed_methods = ['get','post','put']
        authorization = Authorization()
        # fields=['FirstName','Email','Password']
        # extra_kwargs={'Password':['write_only':True,'required':True]}
        # return render(request, 'some_name.html.html')
        

class studentDataResource(ModelResource):
    class Meta:
        queryset = studentData.objects.all()
        resource_name = 'studentPersonalData'
        # excludes= ["product", "price"]
        allowed_methods = ['get','post','put']

# class user1RegisterResource(ModelResource):
#     class Meta:
#         modelUser=User
#         fields=['id','username','email','password']
#         extra_kwargs={'password':['write_only':True,'required':True]}

#     def create(self,validated_data):
#         user=User.objects.create_user(**validated_data)
#         return user
