from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import PastOrder, ProductRatingAndReview
from django.db.models import Count, Avg
from .serializers import PastOrderSerializer, ProductRatingAndReviewSerializer
from rest_framework.decorators import api_view
from rest_framework.response import Response
from datetime import datetime, timedelta
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.db.models import F


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

@api_view(['GET'])
def getProductIdsPurchasedByUser(request, username):
    idsOfUserBoughtProducts = PastOrder.objects.filter(customerUsername = username).values_list('productId', flat=True)
    return Response(idsOfUserBoughtProducts, status=status.HTTP_200_OK)


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
            optionsChosen = request.data['optionsChosen'],
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
            optionsChosen = request.data['optionsChosen'],
            customerUsername=request.data['customerUsername'],
            dateTimeOfPurchase=request.data['dateTimeOfPurchase']
        )
    except PastOrder.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)
    
    pastOrderToDelete.delete()
    return Response(status=status.HTTP_204_NO_CONTENT)

@api_view(['POST'])
def numSalesOfProductsInList(request):
    try:
        country = request.data.get('country')
        productIds = set(request.data.get('productIds'))

        if country != 'all':
            numSalesOfProducts = (
                PastOrder.objects
                .filter(countryOfPurchase=country, productId__in=productIds)
                .values('productId')  # Group by productId
                .annotate(numSold=Count('productId'))  # Count occurrences of each productId
            )
        else:
            numSalesOfProducts = (
                PastOrder.objects
                .filter(productId__in=productIds)
                .values('productId')
                .annotate(numSold=Count('productId'))
            )

    except Exception as e:
        return Response([], status=400)

    return Response(numSalesOfProducts, status=200)


@api_view(['GET'])
def getProductIdsOfPastOrdersOfUserInOrder(request, username):
    productIdsOfPastOrdersOfUserInOrder = (
        PastOrder.objects.filter(customerUsername=username)
        .order_by('-dateTimeOfPurchase')
        .values_list('productId', flat=True)
        .distinct()
    )

    return Response(productIdsOfPastOrdersOfUserInOrder, status=status.HTTP_200_OK)


@api_view(['POST'])
def getNumBuyersInPastMonthForSpecificOptionsOfManyProducts(request):
    try:
        productIdToTextOptionsListMappings = request.data.get('productIdToTextOptionsListMappings')
        if not productIdToTextOptionsListMappings:
            return Response({"error": "Invalid input: Missing productIdToTextOptionsListMappings"}, status=400)
        
        oneMonthAgo = datetime.now() - timedelta(days=30)

        pastOrdersOfGivenProductsInPastMonth = (
            PastOrder.objects
            .filter(
                dateTimeOfPurchase__gte=oneMonthAgo,
                productId__in=productIdToTextOptionsListMappings.keys()
            )
            .values('productId', 'optionsChosen', 'customerUsername')
        )

        output = {}
        for pastOrder in pastOrdersOfGivenProductsInPastMonth:
            productId = pastOrder['productId']
            optionsChosen = pastOrder['optionsChosen']
            customerUsername = pastOrder['customerUsername']

            textOptionsListForProductId = productIdToTextOptionsListMappings.get(productId)

            if optionsChosen in textOptionsListForProductId:
                if productId not in output:
                    output[productId] = []
                
                optionsChosenFound = False
                for outputElem in output[productId]:
                    if outputElem[0] == optionsChosen:
                        outputElem[1].add(customerUsername)
                        optionsChosenFound = True
                        break
                
                if not optionsChosenFound:
                    output[productId].append([optionsChosen, {customerUsername}])
            

        for productId, optionsList in output.items():
            for elem in optionsList:
                elem[1] = len(elem[1])

    except Exception as e:
        print(f"Error: {e}")
        return Response({"error": str(e)}, status=400)

    return Response(output, status=200)



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
    
    productRatingAndReviewToEdit = ProductRatingAndReviewSerializer(productRatingAndReviewToEdit, data=request.data, partial=True)
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


@api_view(['POST'])
def avgAndNumRatingsOfProductsInList(request):
    try:
        country = request.data.get('country')
        productIds = set(request.data.get('productIds'))

        if country != 'all':
            avgAndNumRatingsOfProducts = (
                ProductRatingAndReview.objects
                .filter(country_of_customer=country, product_id__in=productIds)
                .values('product_id')  # Group by productId
                .annotate(avgRating=Avg('rating'), numRatings=Count('product_id'))
            )
        else:
            avgAndNumRatingsOfProducts = (
                ProductRatingAndReview.objects
                .filter(product_id__in=productIds)
                .values('product_id')
                .annotate(avgRating=Avg('rating'), numRatings=Count('product_id'))
            )

    except Exception as e:
        return Response(e, status=400)

    return Response(avgAndNumRatingsOfProducts, status=200)

@api_view(['POST'])
def getPurchasesOfUserWithNoOr4PlusRating(request, username):
    try:
        idsOfUserBoughtProducts = request.data.get('idsOfUserBoughtProducts')

        idsOfPurchasedProductsWithRatings = set(
            ProductRatingAndReview.objects
            .filter(reviewer_username=username)
            .values_list('product_id', flat=True)
            .distinct()
        )

        idsOfPurchasedProductsWithoutRatings = [
            product_id for product_id in idsOfUserBoughtProducts
            if product_id not in idsOfPurchasedProductsWithRatings
        ]

        idsOfPurchasedProductsWith4PlusRating = list(
            ProductRatingAndReview.objects
            .filter(
                reviewer_username=username,
                rating__gte=4,
            )
            .distinct()
            .values_list('product_id', flat=True)
        )

        output = idsOfPurchasedProductsWithoutRatings + idsOfPurchasedProductsWith4PlusRating

    except Exception as e:
        print(str(e))
        return Response(str(e), status=400)

    return Response(output, status=200)


@api_view(['POST'])
def getIdsOfProductsBoughtByCustomersWhoAlsoBought(request, username):
    try:
        productIds = set(request.data.get('productIds'))
        idsToInclude = set(request.data.get('idsToInclude'))

        customersWhoBoughtAProductOrMoreInProductIds = set(PastOrder.objects
            .filter(productId__in=productIds)
            .exclude(customerUsername=username)
            .values_list('customerUsername', flat=True)
        )

        productsBoughtBySaidCustomers = list(PastOrder.objects
            .filter(
                productId__in=idsToInclude,
                customerUsername__in=customersWhoBoughtAProductOrMoreInProductIds
            )
            .exclude(productId__in=productIds)
            .values_list('productId', flat=True)
            .distinct()
        )

    except Exception as e:
        print(str(e))
        return Response(str(e), status=400)
    
    return Response(productsBoughtBySaidCustomers, status=200)
