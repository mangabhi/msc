from django.shortcuts import render
from django.contrib.auth.models import User
from .models import Note ,PostResource,DocumentModel,UpcomingEvent
from .serializer import NoteSerializer, UserRegisterSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.response import Response
from rest_framework import status ,viewsets
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .serializer import UserSerializer ,UploadSerializer, DocumentSerializer, UpcomingEventSerializer
from rest_framework_simplejwt.tokens import AccessToken
from django.contrib.auth import get_user_model

# Create your views here.

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_notes(request):
    user = request.user
    notes = Note.objects.filter(owner=user)
    serializer = NoteSerializer(notes, many=True)
    return Response(serializer.data)

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserRegisterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(serializer.data)
    return Response(serializer.errors)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def is_authenticated(request):
    return Response({'authenticated': True, 'is_superuser': request.user.is_superuser, 'is_staff': request.user.is_staff})


@api_view(['POST'])
@permission_classes([IsAuthenticated])
def logout(request):

    try:
       res = Response()
       res.data = {'success': True}
       res.delete_cookie('access_token', path='/', samesite='None')
       res.delete_cookie('refresh_token', path='/', samesite='None')
       res.delete_cookie('is_superuser', path='/', samesite='None')  # Optional: Clear is_superuser cookie
       return res

    except Exception as e:
        print(e)
        return Response({'success':False})
    

class CustomTokenObtainPairView(TokenObtainPairView):
    def post(self, request, *args, **kwargs):
        try:
            response = super().post(request, *args, **kwargs)
            tokens = response.data

            access_token = tokens['access']
            refresh_token = tokens['refresh']

            seriliazer = UserSerializer(request.user, many=False)
            decode_token = AccessToken(access_token)
            user_id = decode_token['user_id']

            User = get_user_model()
            user = User.objects.get(id=user_id)
            res = Response()
            res.data = {'success':True, 'is_superuser': user.is_superuser,'is_staff': user.is_staff}

            res.set_cookie(
                key='access_token',
                value=str(access_token),
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )

            res.set_cookie(
                key='refresh_token',
                value=str(refresh_token),
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            res.set_cookie(
                key='is_superuser',
                value=str(user.is_superuser),
                httponly=True,
                secure=True,
                samesite='None',
                path='/'
            )
            # res.data.update(tokens)
            return res
        
        except Exception as e:
            print(e)
            return Response({'success':False})

class CustomTokenRefreshView(TokenRefreshView):
    def post(self, request, *args, **kwargs):
        try:
            refresh_token = request.COOKIES.get('refresh_token')

            request.data['refresh'] = refresh_token

            response = super().post(request, *args, **kwargs)
            
            tokens = response.data
            access_token = tokens['access']

            res = Response()
            print('user e', request.user)
            res.data = {'refreshed': True}

            res.set_cookie(
                key='access_token',
                value=access_token,
                httponly=True,
                secure=False,
                samesite='None',
                path='/'
            )
            return res

        except Exception as e:
            print(e)
            return Response({'refreshed': False})

class DocumentViewSet(viewsets.ModelViewSet):
    queryset = PostResource.objects.all()
    serializer_class = UploadSerializer
    permission_classes = [AllowAny]

class UploadViewSet(viewsets.ModelViewSet):
    queryset = DocumentModel.objects.all()
    serializer_class = DocumentSerializer
    permission_classes = [AllowAny]

class UpcomingEventViewSet(viewsets.ModelViewSet):
    queryset = UpcomingEvent.objects.all()
    serializer_class = UpcomingEventSerializer
    permission_classes = [AllowAny]
