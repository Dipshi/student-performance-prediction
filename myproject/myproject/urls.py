"""myproject URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.conf.urls import url
from rest_framework.authtoken.views import ObtainAuthToken
# from rest_framework_jwt.views import obtain_jwt_token, refresh_jwt_token
from rest_framework.authtoken import views
# from rest_framework import router
# from userRegister.views import UserRegViewSet
# from userRegister import views

# v1_api = Api(api_name='v1')
# v1_api.register(userRegisterResource())
# v1_api.register(studentDataResource())
# router = routers.DefaultRouter()
# router.register(r'users', UserRegViewSet.snippet_list)


urlpatterns = [
    path('admin/', admin.site.urls),
    path('', include('userRegister.urls')),
    path('', include('studentAcademics.urls')),
    path('', include('stuData.urls')),
    path('', include('webapp.urls')),
    path('', include('prediction.urls')),
    path('', include('predictiondsesem3.urls')),
    url(r'^auth/', include('rest_framework.urls')),
    url(r'^api-token-auth/', views.obtain_auth_token)
    # url(r'^auth/', include('rest_framework.urls')),
    # path(r'api-token-auth/', obtain_jwt_token),
    # path(r'api-token-refresh/', refresh_jwt_token),
    # url(r'^api/', include(v1_api.urls)),
]

