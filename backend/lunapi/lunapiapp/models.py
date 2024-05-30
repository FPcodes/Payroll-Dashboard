# This is an auto-generated Django model module.
# You'll have to do the following manually to clean this up:
#   * Rearrange models' order
#   * Make sure each model has one field with primary_key=True
#   * Make sure each ForeignKey and OneToOneField has `on_delete` set to the desired behavior
#   * Remove `managed = False` lines if you wish to allow Django to create, modify, and delete the table
# Feel free to rename the models, but don't rename db_table values or field names.
from django.db import models


class AuthGroup(models.Model):
    name = models.CharField(unique=True, max_length=150)

    class Meta:
        managed = False
        db_table = 'auth_group'


class AuthGroupPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)
    permission = models.ForeignKey('AuthPermission', models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_group_permissions'
        unique_together = (('group', 'permission'),)


class AuthPermission(models.Model):
    name = models.CharField(max_length=255)
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING)
    codename = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'auth_permission'
        unique_together = (('content_type', 'codename'),)


class AuthUser(models.Model):
    password = models.CharField(max_length=128)
    last_login = models.DateTimeField(blank=True, null=True)
    is_superuser = models.BooleanField()
    username = models.CharField(unique=True, max_length=150)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)
    email = models.CharField(max_length=254)
    is_staff = models.BooleanField()
    is_active = models.BooleanField()
    date_joined = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'auth_user'


class AuthUserGroups(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    group = models.ForeignKey(AuthGroup, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_groups'
        unique_together = (('user', 'group'),)


class AuthUserUserPermissions(models.Model):
    id = models.BigAutoField(primary_key=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)
    permission = models.ForeignKey(AuthPermission, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'auth_user_user_permissions'
        unique_together = (('user', 'permission'),)


class DjangoAdminLog(models.Model):
    action_time = models.DateTimeField()
    object_id = models.TextField(blank=True, null=True)
    object_repr = models.CharField(max_length=200)
    action_flag = models.SmallIntegerField()
    change_message = models.TextField()
    content_type = models.ForeignKey('DjangoContentType', models.DO_NOTHING, blank=True, null=True)
    user = models.ForeignKey(AuthUser, models.DO_NOTHING)

    class Meta:
        managed = False
        db_table = 'django_admin_log'


class DjangoContentType(models.Model):
    app_label = models.CharField(max_length=100)
    model = models.CharField(max_length=100)

    class Meta:
        managed = False
        db_table = 'django_content_type'
        unique_together = (('app_label', 'model'),)


class DjangoMigrations(models.Model):
    id = models.BigAutoField(primary_key=True)
    app = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    applied = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_migrations'


class DjangoSession(models.Model):
    session_key = models.CharField(primary_key=True, max_length=40)
    session_data = models.TextField()
    expire_date = models.DateTimeField()

    class Meta:
        managed = False
        db_table = 'django_session'


class Officialhoursubmission(models.Model):
    paysub_id = models.AutoField(primary_key=True)  # The composite primary key (paysub_id, payperiod) found, that is not supported. The first column is selected.
    project = models.ForeignKey('Officialprojects', models.DO_NOTHING, blank=True, null=True)
    empl = models.ForeignKey('Officialpayrollcrew', models.DO_NOTHING, blank=True, null=True)
    payperiod = models.DateField()
    monday = models.DecimalField(max_digits=2, decimal_places=1, blank=True, null=True)
    tuesday = models.DecimalField(max_digits=2, decimal_places=1, blank=True, null=True)
    wednesday = models.DecimalField(max_digits=2, decimal_places=1, blank=True, null=True)
    thursday = models.DecimalField(max_digits=2, decimal_places=1, blank=True, null=True)
    friday = models.DecimalField(max_digits=2, decimal_places=1, blank=True, null=True)
    saturday = models.DecimalField(max_digits=2, decimal_places=1, blank=True, null=True)
    sunday = models.DecimalField(max_digits=2, decimal_places=1, blank=True, null=True)
    totalhours = models.DecimalField(max_digits=3, decimal_places=1, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'officialhoursubmission'
        unique_together = (('paysub_id', 'payperiod'),)


class Officiallunacrew(models.Model):
    lunaempl_id = models.IntegerField(primary_key=True)
    firstname = models.CharField(max_length=255, blank=True, null=True)
    lastname = models.CharField(max_length=255, blank=True, null=True)
    role = models.CharField(max_length=255, blank=True, null=True)
    email = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'officiallunacrew'


class Officialpayrollcrew(models.Model):
    empl_id = models.IntegerField(primary_key=True)  # The composite primary key (empl_id, lastname) found, that is not supported. The first column is selected.
    firstname = models.CharField(blank=True, null=True)
    lastname = models.CharField()
    dateofbirth = models.DateField(blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'officialpayrollcrew'
        unique_together = (('empl_id', 'lastname'),)


class Officialpayrollinfo(models.Model):
    paysub = models.OneToOneField(Officialhoursubmission, models.DO_NOTHING, primary_key=True)
    project = models.ForeignKey('Officialprojects', models.DO_NOTHING, blank=True, null=True)
    empl = models.ForeignKey('Officialpayrollcrew', models.DO_NOTHING, blank=True, null=True)
    payperiod = models.DateField(blank=True, null=True)
    payrate = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    totalhours = models.DecimalField(max_digits=3, decimal_places=1, blank=True, null=True)
    grosspay = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    ficatax = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    fedtax = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    statetax = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    citytax = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    suditax = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    netpay = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'officialpayrollinfo'


class Officialprojects(models.Model):
    project_id = models.AutoField(primary_key=True)
    contractor = models.CharField(max_length=255, blank=True, null=True)
    streetaddress = models.CharField(max_length=255, blank=True, null=True)
    city = models.CharField(max_length=255, blank=True, null=True)
    zipcode = models.CharField(max_length=5, blank=True, null=True)
    startdate = models.DateField(blank=True, null=True)
    enddate = models.DateField(blank=True, null=True)
    projectname = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'officialprojects'


class Officialweeklyprinfo(models.Model):
    projectpayrollid = models.AutoField(primary_key=True)
    netpayroll = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    ficatax = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    fedtax = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    statetax = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    citytax = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    lunafica = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    lunafuta = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    lunasudi = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    payrollfee = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    totalexpenses = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    payperiod = models.DateField(blank=True, null=True)
    tax_owed = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)

    class Meta:
        managed = False
        db_table = 'officialweeklyprinfo'
