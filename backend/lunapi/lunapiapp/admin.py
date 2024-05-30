from django.contrib import admin
from .models import Officiallunacrew, Officialpayrollcrew, Officialprojects, Officialweeklyprinfo, Officialpayrollinfo

# Register your models here.

admin.site.register(Officiallunacrew)
admin.site.register(Officialprojects)
admin.site.register(Officialpayrollinfo)
admin.site.register(Officialweeklyprinfo)
admin.site.register(Officialpayrollcrew)