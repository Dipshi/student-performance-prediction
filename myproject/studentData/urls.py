from django.urls import path
from studentData import views


urlpatterns = [
    path('userDetails/', views.snippet_list),
    path('userPersonalDetails/<int:pk>/', views.snippet_detail),
    
]