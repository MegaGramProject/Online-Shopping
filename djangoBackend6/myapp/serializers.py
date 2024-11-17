from rest_framework import serializers
from rest_framework_mongoengine import serializers as mongoDBSerializers
from .models import Product_Page_Viewer, UpdatesOfCartsAndSavedItems


class Product_Page_Viewer_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Product_Page_Viewer
        fields = '__all__'


class UpdatesOfCartsAndSavedItemsSerializer(mongoDBSerializers.DocumentSerializer):
    class Meta:
        model = UpdatesOfCartsAndSavedItems
        fields = '__all__'
