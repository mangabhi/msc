from django.db import models
from django.contrib.auth.models import User
from django.core.exceptions import ValidationError

class Note(models.Model):
    description = models.CharField(max_length=300)
    owner = models.ForeignKey(User, on_delete=models.CASCADE, related_name='note')

def validate_file_type_and_size(value):
    # Check file size (limit to 1MB)
    if value.size > 1 * 1024 * 1024:  # 1MB in bytes
        raise ValidationError("File size must not exceed 1MB.")
    
    # Check file type (allow only PDF and XLSX)
    valid_mime_types = ['application/pdf', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet']
    if value.file.content_type not in valid_mime_types:
        raise ValidationError("Only PDF and XLSX files are allowed.")

class PostResource(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    fileupload = models.FileField(upload_to='uploads/',null=True,blank=True)

    def __str__(self):
        return self.title

class DocumentModel(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    fileupload = models.FileField(upload_to='resource/',null=True,blank=True)

    def __str__(self):
        return self.title

class UpcomingEvent(models.Model):
    name = models.CharField(max_length=255)
    location = models.CharField(max_length=255)
    description = models.TextField(null=True)
    date_from = models.DateField()
    date_to = models.DateField()
    image = models.FileField(upload_to='event/',null=True,blank=True)  # storing image link (URL)

    def __str__(self):
        return self.name
    
class ProfileDetails(models.Model):
    profile_picture = models.FileField(upload_to='profile/', null=True, blank=True)
    name = models.CharField(max_length=255,null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    designation = models.CharField(max_length=255, null=True, blank=True)
    department = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)

    def __str__(self):
        return self.user.username

class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    profile_picture = models.FileField(upload_to='profile/', null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)
    address = models.CharField(max_length=255, null=True, blank=True)
    designation = models.CharField(max_length=255, null=True, blank=True)
    department = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    interests = models.JSONField(default=list, blank=True, null=True) 

    def __str__(self):
        return self.user.username