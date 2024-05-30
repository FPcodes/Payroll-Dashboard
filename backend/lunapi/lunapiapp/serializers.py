from django.db.models import F, Sum
from rest_framework import serializers
from .models import Officialhoursubmission, Officialpayrollinfo, Officialpayrollcrew, Officialweeklyprinfo, Officiallunacrew, Officialprojects

class dashchartoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Officialweeklyprinfo
        fields = ['payperiod', 'netpayroll', 'tax_owed', 'totalexpenses']
        
class dashtableoneSerializer(serializers.ModelSerializer):
    class Meta:
        model = Officiallunacrew
        fields = ['lunaempl_id', 'firstname', 'role', 'email']
        
class dashtabletwoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Officialprojects
        fields = ['projectname', 'streetaddress', 'city', 'startdate', 'enddate']

class crewtableoneSerializer(serializers.ModelSerializer):
    totalgrosspay = serializers.SerializerMethodField()
    totaltaxpaidbyempl = serializers.SerializerMethodField()
    totalnetpay = serializers.SerializerMethodField()

    class Meta:
        model = Officialpayrollcrew
        fields = ('empl_id', 'firstname', 'lastname', 'totalgrosspay', 'totaltaxpaidbyempl', 'totalnetpay')

    def get_totalgrosspay(self, obj):
        return obj.officialpayrollinfo_set.aggregate(total=Sum('grosspay'))['total']

    def get_totaltaxpaidbyempl(self, obj):
        return obj.officialpayrollinfo_set.aggregate(
            total=Sum(
                F('ficatax') + F('fedtax') + F('statetax') + F('citytax') + F('suditax')
            )
        )['total']

    def get_totalnetpay(self, obj):
        return obj.officialpayrollinfo_set.aggregate(total=Sum('netpay'))['total']
    
class DecimalToFloatField(serializers.Field):
    def to_representation(self, value):
        return float(value) if value is not None else None

    def to_internal_value(self, data):
        return data
    
class OfficialhoursubmissionSerializer(serializers.ModelSerializer):
    project_name = serializers.CharField(source='project.projectname', read_only=True)
    employee_name = serializers.CharField(source='empl.firstname', read_only=True)
    
    # Use custom DecimalToFloatField for these fields
    monday = DecimalToFloatField()
    tuesday = DecimalToFloatField()
    wednesday = DecimalToFloatField()
    thursday = DecimalToFloatField()
    friday = DecimalToFloatField()
    saturday = DecimalToFloatField()
    sunday = DecimalToFloatField()
    totalhours = DecimalToFloatField()

    class Meta:
        model = Officialhoursubmission
        fields = [
            'paysub_id', 'project', 'project_name', 'empl', 'employee_name', 
            'payperiod', 'monday', 'tuesday', 'wednesday', 'thursday', 
            'friday', 'saturday', 'sunday', 'totalhours'
        ]

class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Officialpayrollcrew
        fields = ['empl_id', 'firstname']

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Officialprojects
        fields = ['project_id', 'projectname']
