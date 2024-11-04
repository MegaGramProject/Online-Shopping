from django.urls import path
from . import views

urlpatterns = [
    path("getAllPastOrders", views.getAllPastOrders, name="Get All Past-Orders"),
    path("getAllPastOrdersOfUser/<str:username>", views.getAllPastOrdersOfUser, name="Get All Past-Orders Of User"),
    path("addPastOrder", views.addPastOrder, name="Add Past-Orders"),
    path("editPastOrder", views.editPastOrder, name="Edit Past-Order"),
    path("deletePastOrder", views.deletePastOrder, name="Delete Past-Order"),
    path("numSalesOfProductsInList", views.numSalesOfProductsInList, name="# of Sales Of Products In List"),


    path("getAllProductRatingsAndReviews", views.getAllProductRatingsAndReviews, name="Get All Product Ratings & Reviews"),
    path("getAllProductRatingsAndReviewsOfUser/<str:reviewer_username>", views.getAllProductRatingsAndReviewsOfUser, name="Get All Product Ratings & Reviews Of User"),
    path("getAllProductRatingsAndReviewsOfProduct/<str:product_id>", views.getAllProductRatingsAndReviewsOfProduct, name="Get All Product Ratings & Reviews Of Product"),
    path("addProductRatingAndReview", views.addProductRatingAndReview, name="Add Product Rating And Review"),
    path("editProductRatingAndReview", views.editProductRatingAndReview, name="Edit Product Rating And Review"),
    path("deleteProductRatingAndReview", views.deleteProductRatingAndReview, name="Delete Product Rating And Review"),
    path("avgAndNumRatingsOfProductsInList", views.avgAndNumRatingsOfProductsInList, name="Avg & Num-Ratings Of Product in List")


]