from django.urls import path
from stuData import views


urlpatterns = [
    path('personalDetails/', views.snippet_list),
    path('userPersonalDetails/<int:pk>/', views.snippet_detail),
    
]