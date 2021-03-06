from rest_framework import routers, serializers, viewsets
from studentData.models import studentData
from studentData.serializer import UserDataSerializer
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

@api_view(['GET', 'PUT', 'DELETE'])
# @permission_classes(IsAuthenticated,)
def snippet_detail(request,pk):
    print(pk)
    try:
        snippet = studentData.objects.get(sid_id=pk)
    except  studentData.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

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