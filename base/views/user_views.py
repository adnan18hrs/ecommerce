from rest_framework.decorators import api_view
from rest_framework.response import Response
from base.models import *
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAdminUser, IsAuthenticated
from rest_framework.response import Response
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.settings import api_settings
from rest_framework import status
from base.serializers import UserSerializer, UserSerializerWithToken
from django.contrib.auth.hashers import make_password
from base.serializers import User


class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    # using validate function will send username on frontend as it is. which will exclude burden of decoding on UI
    def validate(self, attrs):
        data = super().validate(attrs)
        # when obj call func having self as a argument, then obj assigned into self & obj can be accessed using self
        modelValue = UserSerializerWithToken(self.user)
        serializer = modelValue.data
        print("halla1")
        for k, v in serializer.items():
            print("k and v", k, " and ", v)
            data[k] = v
        return data


class MyTokenObtainPairView(TokenObtainPairView):
    print("this is MyTokenObtainPairView")
    serializer_class = MyTokenObtainPairSerializer


@api_view(["POST"])
def registerUser(request):
    print("halla8")
    data = request.data
    try:
        user = User.objects.create(
            first_name=data["name"],
            username=data["email"],
            email=data["email"],
            password=make_password(data["password"]),
        )
        serializer = UserSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {"detail", "user with this email already exist"}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUserProfile(request):
    user = request.user
    print("request.user = ", request.user)
    serializer = UserSerializerWithToken(user, many=False)

    data = request.data
    print("request.data = ", request.data)
    user.first_name = data["name"]
    user.username = data["email"]
    user.email = data["email"]

    if data["password"] != "":
        user.password = make_password(data["password"])

    user.save()
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def getUserProfile(request):
    user = request.user
    # many=false is used for one object
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUsers(request):
    print("User is Admin")
    users = User.objects.all()
    serializer = UserSerializer(users, many=True)
    print("all USER are  = ", serializer)
    return Response(serializer.data)


@api_view(["GET"])
@permission_classes([IsAdminUser])
def getUserById(request, pk):
    user = User.objects.get(id=pk)
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["PUT"])
@permission_classes([IsAuthenticated])
def updateUser(request, pk):
    user = User.objects.get(id=pk)
    data = request.data
    user.first_name = data["name"]
    user.username = data["email"]
    user.email = data["email"]
    user.is_staff = data["isAdmin"]
    user.save()
    serializer = UserSerializer(user, many=False)
    return Response(serializer.data)


@api_view(["DELETE"])
@permission_classes([IsAdminUser])
def deleteUser(request, pk):
    userForDeletion = User.objects.get(id=pk)
    userForDeletion.delete()
    return Response("User was deleted")
