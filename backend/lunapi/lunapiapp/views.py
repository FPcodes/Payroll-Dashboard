from rest_framework import generics
from .models import Officialhoursubmission, Officialweeklyprinfo, Officiallunacrew, Officialprojects, Officialpayrollcrew
from .serializers import dashchartoneSerializer, dashtableoneSerializer, dashtabletwoSerializer, crewtableoneSerializer, OfficialhoursubmissionSerializer, EmployeeSerializer, ProjectSerializer

# Create your views here.

class dashChartOne(generics.ListCreateAPIView):
    queryset = Officialweeklyprinfo.objects.all()
    serializer_class = dashchartoneSerializer 
    
class dashTableOne(generics.ListCreateAPIView):
    queryset = Officiallunacrew.objects.all().order_by('lunaempl_id')
    serializer_class = dashtableoneSerializer
    
class dashTableTwo(generics.ListCreateAPIView):
    queryset = Officialprojects.objects.all()
    serializer_class = dashtabletwoSerializer
    
class crewTableOne(generics.ListAPIView):
    queryset = Officialpayrollcrew.objects.all()
    serializer_class = crewtableoneSerializer


class EmployeeListView(generics.ListAPIView):
    queryset = Officialpayrollcrew.objects.all()
    serializer_class = EmployeeSerializer

class ProjectListView(generics.ListAPIView):
    queryset = Officialprojects.objects.all()
    serializer_class = ProjectSerializer

class OfficialhoursubmissionView(generics.ListCreateAPIView):
    queryset = Officialhoursubmission.objects.all()
    serializer_class = OfficialhoursubmissionSerializer