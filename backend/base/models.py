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
    fileupload = models.FileField(upload_to='uploads/',null=True,blank=True),

    def __str__(self):
        return self.title