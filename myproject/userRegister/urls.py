from django.urls import path
from userRegister import views


urlpatterns = [
    path('userRegister/', views.userRegisteration),
    path('userLogin/', views.userLogin),
    path('userLogout/<int:pk>/',views.logout),
    # path('userDetails/<int:pk>/', views.snippet_detail),
    
]