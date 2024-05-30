from django.urls import path
from . import views

urlpatterns = [
    path('dashchartone/', views.dashChartOne.as_view(), name='dashboardchartone'),
    path('dashtableone/', views.dashTableOne.as_view(), name='dashboardtableone'),
    path('dashtabletwo/', views.dashTableTwo.as_view(), name='dashboardtabletwo'),
    path('crewtableone/', views.crewTableOne.as_view(), name='crewtableone'),
    path('employees/', views.EmployeeListView.as_view(), name='employee-list'),
    path('projects/', views.ProjectListView.as_view(), name='project-list'),
    path('hourssubmission/', views.OfficialhoursubmissionView.as_view(), name='hours-submission'),
]
