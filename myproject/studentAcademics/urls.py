from django.urls import path
from studentAcademics import views


urlpatterns = [
    path('userDetails/', views.snippet_list),
    path('userEduDetails/<int:pk>/', views.snippet_detail),
    
]