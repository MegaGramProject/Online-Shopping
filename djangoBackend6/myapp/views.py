from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Product_Page_Viewer, UpdatesOfCartsAndSavedItems
from .serializers import Product_Page_Viewer_Serializer, UpdatesOfCartsAndSavedItemsSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import Count


@api_view(['GET'])
def getAllProductPageViewers(request):
    allProductPageViewers = Product_Page_Viewer.objects.all()
    allProductPageViewers = Product_Page_Viewer_Serializer(allProductPageViewers, many=True)
    return Response(allProductPageViewers.data, status=status.HTTP_200_OK)


@api_view(['GET'])
def getBrowsingHistoryOfUserInChronOrder(request, username):
    pastOrdersOfUser = (
        Product_Page_Viewer.objects
            .filter(username=username)
            .order_by('-date_time')
            .values('id', 'product_id')
    )
    return Response(pastOrdersOfUser, status=status.HTTP_200_OK)

@api_view(['POST'])
def addProductPageViewer(request):
    newProductPageViewer = Product_Page_Viewer_Serializer(data=request.data)
    if newProductPageViewer.is_valid():
        newProductPageViewer.save()
        return Response(newProductPageViewer.data, status=status.HTTP_201_CREATED)
    return Response(newProductPageViewer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PATCH'])
def editProductPageViewer(request, id):
    try:
        productPageViewerToEdit = Product_Page_Viewer.objects.get(id=id)
    except Product_Page_Viewer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    productPageViewerToEdit = Product_Page_Viewer_Serializer(productPageViewerToEdit, data=request.data, partial=True)
    if productPageViewerToEdit.is_valid():
        productPageViewerToEdit.save()
        return Response(productPageViewerToEdit.data)
    
    return Response(productPageViewerToEdit.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['DELETE'])
def deleteProductPageViewer(request, id):
    try:
        productPageViewerToDelete = Product_Page_Viewer.objects.get(id=id)
    except Product_Page_Viewer.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    productPageViewerToDelete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)
    

@api_view(['POST'])
def getIdsOfProductsMostViewedByCustomersWhoAlsoViewed(request, username):
    try:
        idsToInclude = set(request.data.get('idsToInclude'))
        idsToExclude = set(request.data.get('idsToExclude'))
        productIdsViewed = set(request.data.get('productIdsViewed'))

        customersWhoViewedAProductOrMoreInProductIdsViewed = set(
            Product_Page_Viewer.objects
            .filter(product_id__in=productIdsViewed)
            .values_list('username', flat=True)
        )

        customersWhoViewedAProductOrMoreInProductIdsViewed.remove(username)

        productsMostViewedBySaidCustomers = Product_Page_Viewer.objects.filter(
            product_id__in=idsToInclude,
            username__in=customersWhoViewedAProductOrMoreInProductIdsViewed
        ).exclude(
            product_id__in=idsToExclude | productIdsViewed
        ).values('product_id').annotate(
            count=Count('product_id')
        ).order_by('-count')

        idsOfProductsMostViewedBySaidCustomers = [
            elem['product_id'] for elem in productsMostViewedBySaidCustomers
        ]

    except Exception as e:
        return Response(str(e), status=400)
    
    return Response(idsOfProductsMostViewedBySaidCustomers, status=200)


@api_view(['GET'])
def getAllUpdatesOfCartsAndSavedItems(request):
    allUpdatesOfCartsAndSavedItems = UpdatesOfCartsAndSavedItems.objects.all()
    allUpdatesOfCartsAndSavedItems = UpdatesOfCartsAndSavedItemsSerializer(allUpdatesOfCartsAndSavedItems, many=True)
    return Response(allUpdatesOfCartsAndSavedItems.data, status=status.HTTP_200_OK)

@api_view(['GET'])
def getAllUpdatesOfCartsAndSavedItemsOfUser(request, username):
    allUpdatesOfCartsAndSavedItemsOfUser = (
        UpdatesOfCartsAndSavedItems.objects
            .filter(username=username)
    )
    allUpdatesOfCartsAndSavedItemsOfUser = UpdatesOfCartsAndSavedItemsSerializer(allUpdatesOfCartsAndSavedItemsOfUser, many=True)
    return Response(allUpdatesOfCartsAndSavedItemsOfUser.data, status=status.HTTP_200_OK)


@api_view(['POST'])
def addUpdateToCartAndSavedItems(request):
    candidatesForDeletion = (
        UpdatesOfCartsAndSavedItems.objects
        .filter(
        username=request.data['username'],
        productId=request.data['productId']
        )
    )

    newPrices = request.data['prices']

    for candidate in candidatesForDeletion:
        if candidate.options==request.data['options']:
            if newPrices[0] == 'removed-from-seller':
                candidate.delete()
            elif len(newPrices)==2:
                if len(candidate.prices)==2:
                    newPrices[0] = candidate.prices[0]
                    candidate.delete()

    
    newUpdateToCartAndSavedItems = UpdatesOfCartsAndSavedItemsSerializer(data=request.data)
    if newUpdateToCartAndSavedItems.is_valid():
        newUpdateToCartAndSavedItems.save()
        return Response(newUpdateToCartAndSavedItems.data, status=status.HTTP_201_CREATED)
    return Response(newUpdateToCartAndSavedItems.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def deleteAllUpdatesToCartAndSavedItemsForUser(request, username):
    allUpdatesToCartAndSavedItemsForUser = UpdatesOfCartsAndSavedItems.objects.filter(username=username)
    allUpdatesToCartAndSavedItemsForUser.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)