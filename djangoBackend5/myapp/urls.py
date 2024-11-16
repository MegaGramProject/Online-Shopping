from django.urls import path
from . import views

urlpatterns = [
    path("getAllPastOrders", views.getAllPastOrders, name="Get All Past-Orders"),
    path("getAllPastOrdersOfUser/<str:username>", views.getAllPastOrdersOfUser, name="Get All Past-Orders Of User"),
    path("getProductIdsPurchasedByUser/<str:username>", views.getProductIdsPurchasedByUser, name="Get Product-Ids Purchased By User"),
    path("addPastOrder", views.addPastOrder, name="Add Past-Orders"),
    path("editPastOrder", views.editPastOrder, name="Edit Past-Order"),
    path("deletePastOrder", views.deletePastOrder, name="Delete Past-Order"),
    path("numSalesOfProductsInList", views.numSalesOfProductsInList, name="# of Sales Of Products In List"),
    path("getIdsOfProductsBoughtByCustomersWhoAlsoBought/<str:username>", views.getIdsOfProductsBoughtByCustomersWhoAlsoBought, name="Get Ids Of Products Bought By Customers Who Also Bought"),
    path("getProductIdsOfPastOrdersOfUserInOrder/<str:username>", views.getProductIdsOfPastOrdersOfUserInOrder, name="Get Product-Ids of Past-Orders Of User In Order"),

    path("getAllProductRatingsAndReviews", views.getAllProductRatingsAndReviews, name="Get All Product Ratings & Reviews"),
    path("getAllProductRatingsAndReviewsOfUser/<str:reviewer_username>", views.getAllProductRatingsAndReviewsOfUser, name="Get All Product Ratings & Reviews Of User"),
    path("getAllProductRatingsAndReviewsOfProduct/<str:product_id>", views.getAllProductRatingsAndReviewsOfProduct, name="Get All Product Ratings & Reviews Of Product"),
    path("addProductRatingAndReview", views.addProductRatingAndReview, name="Add Product Rating And Review"),
    path("editProductRatingAndReview", views.editProductRatingAndReview, name="Edit Product Rating And Review"),
    path("deleteProductRatingAndReview", views.deleteProductRatingAndReview, name="Delete Product Rating And Review"),
    path("avgAndNumRatingsOfProductsInList", views.avgAndNumRatingsOfProductsInList, name="Avg & Num-Ratings Of Product in List"),
    path("getPurchasesOfUserWithNoOr4PlusRating/<str:username>", views.getPurchasesOfUserWithNoOr4PlusRating, name="Get Purchases Of User With No/4+ Rating")
]