from rest_framework import routers, serializers, viewsets
from stuData.models import stuData
from stuData.serializer import UserDataSerializer
from rest_framework.decorators import api_view,permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from rest_framework.permissions import IsAuthenticated
import json
from rest_framework.authtoken.models import Token


# @csrf_exempt

@api_view(['GET', 'POST']) 
## specification of the allowed methods
# @csrf_exempt
def snippet_list(request):
    if request.method == 'GET':
        snippets = stuData.objects.all()
        serializer = sUserDataSerializer(snippets, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = UserDataSerializer(data=request.data)
        #calls create method of serializer.py
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
@api_view(['GET', 'PUT', 'DELETE'])
# @permission_classes(IsAuthenticated,)
def snippet_detail(request,pk):
    try:
        snippet = stuData.objects.get(sid_id=pk)
    except  stuData.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    try:
        token = Token.objects.get(user_id=pk)
    except  Token.DoesNotExist:
        return Response(status=status.HTTP_403_Forbidden)

    if request.method == 'GET':
        serializer = UserDataSerializer(snippet)
        # print(serializer.data)
        return Response(serializer.data)

    elif request.method == 'PUT':
        serializer = UserDataSerializer(snippet, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    elif request.method == 'DELETE':
        snippet.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)