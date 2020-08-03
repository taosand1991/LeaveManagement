from .serializers import *
from .models import *
from rest_framework import status
from rest_framework import viewsets
from rest_framework.decorators import action, api_view
from rest_framework.response import Response


class UserViewSet(viewsets.ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(detail=True, url_path='user_staff')
    def get_staff_id(self, request, pk=None):
        queryset = User.objects.filter(staff_id__contains=pk)
        print(queryset)
        serializer = UserSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, url_path='employee')
    def get_employee(self, request):
        queryset = User.objects.filter(is_employee=True)
        serializer = UserSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class LeaveViewSet(viewsets.ModelViewSet):
    serializer_class = LeaveSerializer
    queryset = Leave.objects.all()

    @action(detail=False, url_path='get_user')
    def get_user(self, request, pk=None):
        queryset = Leave.objects.filter(user=request.user)
        serializer = LeaveSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, url_path='pending')
    def get_pending(self, request):
        queryset = Leave.objects.filter(is_pending=True)
        serializer = LeaveSerializer(queryset, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)


class LeaveApprovalViewSet(viewsets.ModelViewSet):
    serializer_class = LeaveApprovalSerializer
    queryset = LeaveApproval.objects.all()
