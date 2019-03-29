from django.urls import path
from stuData import views


urlpatterns = [
    path('personalDetails/', views.eduList),
    path('userPersonalDetails/<int:pk>/', views.eduDetail),
    
]