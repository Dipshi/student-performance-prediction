from rest_framework import routers, serializers, viewsets
from userRegister.models import userRegister
from userRegister.serializer import UserRegSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.permissions import IsAuthenticated
import json
from rest_framework.authtoken.models import Token

@api_view(['GET', 'POST'])
@csrf_exempt
## function responsible for authenticating users
def userLogin(request):
    data = request.data
    try:
        username = data['username']
        password = data['password']
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(username=username, password=password)
    except:
        return Response(usestatus=status.HTTP_401_UNAUTHORIZED)
    try:
        user_token = user.auth_token.key
    except:
        user_token = Token.objects.create(user=user)
    # print(user.id)
    data = {'token': user_token,'username':username,'id':user.id}
    return Response(data=(data), status=status.HTTP_200_OK)

##logging user out by deleting tokens
@api_view(['GET','DELETE'])
def logout( request, pk):
    try:
        snippet = Token.objects.get(user_id=pk)
    except Token.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

    # organization = get_object_or_404(Token, user_id=pk)
    snippet.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    # request.user.auth_token.delete(user_id=pk)
    # return Response(status=status.HTTP_200_OK)
        

@api_view(['GET', 'POST']) 
## specification of the allowed methods
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
# @permission_classes(IsAuthenticated,)
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