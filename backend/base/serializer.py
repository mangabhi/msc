from rest_framework import serializers
from .models import Note 
from .models import PostResource ,DocumentModel, UpcomingEvent ,Profile
from django.contrib.auth.models import User

class NoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'description']

class UserRegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password']

    def create(self, validated_data):
        user = User(
            username=validated_data['username'],
            email=validated_data['email']
        )
        user.set_password(validated_data['password'])
        user.save()
        return user
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']


class UploadSerializer(serializers.ModelSerializer):
    class Meta:
        model = PostResource
        fields = '__all__'


class DocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = DocumentModel
        fields = '__all__'

class UpcomingEventSerializer(serializers.ModelSerializer):
    class Meta:
        model = UpcomingEvent
        fields = '__all__'

class ProfileDetailsSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    class Meta:
        model = Profile
        fields = '__all__'