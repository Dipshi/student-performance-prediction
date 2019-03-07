from django.urls import path
from userRegister import views

urlpatterns = [
    path('userRegister/', views.snippet_list),
    path('userLogin/', views.userLogin),
    path('userDetails/<int:pk>/', views.snippet_detail),
]