from .models import *
from rest_framework import serializers
from rest_framework_jwt.settings import api_settings

jwt_payload_handler = api_settings.JWT_PAYLOAD_HANDLER
jwt_encode_handler = api_settings.JWT_ENCODE_HANDLER


class UserSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_style': 'password'}, write_only=True)
    token = serializers.SerializerMethodField()
    is_employee = serializers.ReadOnlyField()
    is_employer = serializers.ReadOnlyField()

    class Meta:
        model = User
        fields = [
            'id', 'first_name', 'last_name', 'phone_number', 'email', 'staff_id', 'department',
            'designation', 'thumbnail', 'is_employee', 'is_employer', 'gender', 'address', 'token',
            'password2', 'password', 'leave_accrual', 'leave_balance'
        ]
        extra_kwargs = {'password': {'write_only': True}}

    def get_token(self, user):
        payload = jwt_payload_handler(user)
        token = jwt_encode_handler(payload)
        return token

    def create(self, validated_data):
        user = User(
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
            designation=validated_data['designation'],
            phone_number=validated_data['phone_number'],
            staff_id=validated_data['staff_id'],
            address=validated_data['address']
        )
        password = validated_data['password']
        password2 = validated_data['password2']
        if password != password2:
            raise serializers.ValidationError({'password': 'password do not match'})
        gender = validated_data['gender']
        is_employer = validated_data['is_employer']
        if gender == "male":
            user.gender = 'Male'
        elif gender == "female":
            user.gender = 'Female'
        else:
            user.gender = 'prefer not to say'
        if is_employer:
            user.is_employer = True
        else:
            user.is_employee = True
        user.set_password(validated_data['password'])
        user.save()


class LeaveApprovalSerializer(serializers.ModelSerializer):
    class Meta:
        model = LeaveApproval
        fields = '__all__'


class LeaveSerializer(serializers.ModelSerializer):
    leaves = serializers.SerializerMethodField()
    approved = serializers.StringRelatedField()
    staff_id = serializers.ReadOnlyField(source='user.staff_id')
    user_accrual = serializers.ReadOnlyField(source='user.leave_accrual')

    class Meta:
        model = Leave
        fields = '__all__'

    def get_leaves(self, obj):
        return LeaveApprovalSerializer(obj.results.all(), many=True).data


class ApprovalSerializer(serializers.ModelSerializer):
    approved_leaves = LeaveApprovalSerializer(many=True, read_only=True)

    class Meta:
        model = Approval
        fields = [
            'id', 'approved_leaves', 'user'
        ]
