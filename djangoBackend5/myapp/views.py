from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import PastOrder, ProductRatingAndReview
from .serializers import PastOrderSerializer, ProductRatingAndReviewSerializer

@api_view(['GET'])
def getAllPastOrders(request):
    allPastOrders = PastOrder.objects.all()
    allPastOrders = PastOrderSerializer(allPastOrders, many=True)
    return Response(allPastOrders.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getAllPastOrdersOfUser(request, username):
    pastOrdersOfUser = PastOrder.objects.filter(customerUsername = username)
    pastOrdersOfUser = PastOrderSerializer(pastOrdersOfUser, many=True)
    return Response(pastOrdersOfUser.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def addPastOrder(request):
    newPastOrder = PastOrderSerializer(data=request.data)
    if newPastOrder.is_valid():
        newPastOrder.save()
        return Response(newPastOrder.data, status=status.HTTP_201_CREATED)
    return Response(newPastOrder.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def editPastOrder(request):
    try:
        pastOrderToEdit = PastOrder.objects.get(
            productId=request.data['productId'],
            customerUsername=request.data['customerUsername'],
            dateTimeOfPurchase=request.data['dateTimeOfPurchase']
        )
    except PastOrder.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    pastOrderToEdit = PastOrderSerializer(pastOrderToEdit, data=request.data, partial=True)
    if pastOrderToEdit.is_valid():
        pastOrderToEdit.save()
        return Response(pastOrderToEdit.data)
    
    return Response(pastOrderToEdit.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deletePastOrder(request):
    try:
        pastOrderToDelete = PastOrder.objects.get(
            productId=request.data['productId'],
            customerUsername=request.data['customerUsername'],
            dateTimeOfPurchase=request.data['dateTimeOfPurchase']
        )
    except PastOrder.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    pastOrderToDelete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['GET'])
def getAllProductRatingsAndReviews(request):
    allProductRatingsAndReviews = ProductRatingAndReview.objects.all()
    allProductRatingsAndReviews = ProductRatingAndReviewSerializer(allProductRatingsAndReviews, many=True)
    return Response(allProductRatingsAndReviews.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getAllProductRatingsAndReviewsOfUser(request, reviewer_username):
    allProductRatingsAndReviewsOfUser = ProductRatingAndReview.objects.filter(reviewer_username = reviewer_username)
    allProductRatingsAndReviewsOfUser = ProductRatingAndReviewSerializer(allProductRatingsAndReviewsOfUser, many=True)
    return Response(allProductRatingsAndReviewsOfUser.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getAllProductRatingsAndReviewsOfProduct(request, product_id):
    allProductRatingsAndReviewsOfProduct = ProductRatingAndReview.objects.filter(product_id = product_id)
    allProductRatingsAndReviewsOfProduct = ProductRatingAndReviewSerializer(allProductRatingsAndReviewsOfProduct, many=True)
    return Response(allProductRatingsAndReviewsOfProduct.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def addProductRatingAndReview(request):
    newProductRatingAndReview = ProductRatingAndReviewSerializer(data=request.data)
    if newProductRatingAndReview.is_valid():
        newProductRatingAndReview.save()
        return Response(newProductRatingAndReview.data, status=status.HTTP_201_CREATED)
    return Response(newProductRatingAndReview.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['PATCH'])
def editProductRatingAndReview(request):
    try:
        productRatingAndReviewToEdit = ProductRatingAndReview.objects.get(
            product_id=request.data['product_id'],
            reviewer_username=request.data['reviewer_username'],
            product_options_selected=request.data['product_options_selected']
        )
    except ProductRatingAndReview.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    productRatingAndReviewToEdit = PastOrderSerializer(productRatingAndReviewToEdit, data=request.data, partial=True)
    if productRatingAndReviewToEdit.is_valid():
        productRatingAndReviewToEdit.save()
        return Response(productRatingAndReviewToEdit.data)
    
    return Response(productRatingAndReviewToEdit.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteProductRatingAndReview(request):
    try:
        productRatingAndReviewToDelete = ProductRatingAndReview.objects.get(
            product_id=request.data['product_id'],
            reviewer_username=request.data['reviewer_username'],
            product_options_selected=request.data['product_options_selected']
        )
    except ProductRatingAndReview.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    productRatingAndReviewToDelete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)