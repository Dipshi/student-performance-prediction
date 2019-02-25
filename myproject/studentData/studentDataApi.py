from tastypie.resources import ModelResource
from studentData.models import studentData


class studentDataResource(ModelResource):
    class Meta:
        queryset = studentData.objects.all()
        resource_name = 'studentPersonalData'
        allowed_methods = ['get']
