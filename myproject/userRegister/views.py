from rest_framework import routers, serializers, viewsets
from userRegister.models import userRegister
from userRegister.serializer import UserRegSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
import json

def userLogin(request):
    email = request.data.get('email')
    # password = request.POST['password']
    print(email)
    # user = authenticate(request, email=email, password=password)
    # if user is not None:
    #     login(request, user)
    #     # Redirect to a success page.
    #     return Response(user, status=status.HTTP_400_BAD_REQUEST)
    #     ...
    # else:
    #     return Response(user, status=status.HTTP_400_BAD_REQUEST)
    #     # Return an 'invalid login' error message.
        

@api_view(['GET', 'POST']) ## specification of the allowed methods
# @csrf_exempt
def snippet_list(request):
    if request.method == 'GET':
        snippets = User.objects.all()
        serializer = UserRegSerializer(snippets, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserRegSerializer(data=request.data)
        #calls create method of serializer.py
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def snippet_detail(request, pk):
   
    try:
        snippet = userRegister.objects.get(pk=pk)
    except userRegister.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    if request.method == 'GET':
        serializer = UserRegSerializer(snippet)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserRegSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)