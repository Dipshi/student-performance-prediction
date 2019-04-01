from django.conf.urls import url
from django.urls import path
from .import views
from django.views.generic import TemplateView

urlpatterns=[

    # url(r'^$',),
    # path('',views.post_data),
    # url(r'^$',TemplateView.as_view(template_name='name.html'),name='name')
    path('prediction/',views.prediction),
    path('sem2/',views.getdata),



]