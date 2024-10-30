from rest_framework import serializers
from .models import PastOrder, ProductRatingAndReview

class PastOrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = PastOrder
        fields = '__all__'

class ProductRatingAndReviewSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductRatingAndReview
        fields = '__all__'