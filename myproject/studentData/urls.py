from django.urls import path
from studentData import views


urlpatterns = [
    path('userDetails/', views.studentDetail),
    path('userPersonalDetails/<int:pk>/', views.studentDetail),
    
]