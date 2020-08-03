from django.db import models
from django.contrib.auth.models import AbstractUser, UserManager


class CustomerUserManager(UserManager):
    def get_by_natural_key(self, email):
        get_email = '{}__exact'.format(self.model.EMAIL_FIELD)
        return self.get(**{get_email: email})


class User(AbstractUser):
    username = models.CharField(blank=True, unique=True, max_length=100)
    email = models.EmailField('Email Address', unique=True)
    staff_id = models.CharField(blank=True, null=True, max_length=50, unique=True)
    phone_number = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    gender = models.CharField(max_length=100, blank=True, null=True)
    designation = models.CharField(max_length=100, blank=True, null=True)
    department = models.CharField(max_length=150, blank=True, null=True)
    thumbnail = models.ImageField(upload_to='profilePic/', blank=True, null=True)
    leave_balance = models.CharField(max_length=50, blank=True, null=True)
    leave_accrual = models.PositiveSmallIntegerField(default=15)
    is_employee = models.BooleanField(default=False)
    is_employer = models.BooleanField(default=False)
    first_name = models.CharField(max_length=150)
    last_name = models.CharField(max_length=150)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']

    def __str__(self):
        return self.email


class Leave(models.Model):
    starting_date = models.DateField()
    ending_date = models.DateField()
    leave_days = models.CharField(max_length=50, blank=True, null=True)
    is_pending = models.BooleanField(default=False)
    note = models.TextField(blank=True, null=True)
    admin_note = models.TextField(blank=True, null=True)
    is_approved = models.BooleanField(default=False)
    is_denied = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    approved = models.ForeignKey(User, related_name='approves', on_delete=models.CASCADE, blank=True, null=True)
    time_stamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.first_name


class LeaveApproval(models.Model):
    leave_result = models.ForeignKey(Leave, on_delete=models.CASCADE, related_name='results')
    is_approved = models.BooleanField(default=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    time_stamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.user.first_name


class Approval(models.Model):
    approved_leave = models.ManyToManyField(LeaveApproval, related_name='leaves')
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    def __str__(self):
        return f'{self.approved_leave.count()}'

