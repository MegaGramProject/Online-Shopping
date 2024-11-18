from django.urls import path
from . import views

urlpatterns = [
    path("getAllProductPageViewers", views.getAllProductPageViewers, name="Get All Product-Page Viewers"),
    path("getBrowsingHistoryOfUserInChronOrder/<str:username>", views.getBrowsingHistoryOfUserInChronOrder, name="Get Browsing-History Of User In Chronological Order"),
    path("addProductPageViewer", views.addProductPageViewer, name="Add Product-Page Viewer"),
    path("editProductPageViewer/<int:id>", views.editProductPageViewer, name="Edit Product-Page Viewer"),
    path("deleteProductPageViewer/<int:id>", views.deleteProductPageViewer, name="Delete Product-Page Viewer"),
    path("getIdsOfProductsMostViewedByCustomersWhoAlsoViewed/<str:username>", views.getIdsOfProductsMostViewedByCustomersWhoAlsoViewed, name="Get Ids Of Products Most Viewed By Customers Who Also Viewed"),

    path("getAllUpdatesOfCartsAndSavedItems", views.getAllUpdatesOfCartsAndSavedItems, name="Get All Updates of Items in Cart or Saved for Later"),
    path("getAllUpdatesOfCartsAndSavedItemsOfUser/<str:username>", views.getAllUpdatesOfCartsAndSavedItemsOfUser, name="Get All Updates Of Carts And Saved Items Of User"),
    path("addUpdateToCartAndSavedItems", views.addUpdateToCartAndSavedItems, name="Add Update To Cart And Saved-Items"),
    path("deleteAllUpdatesToCartAndSavedItemsForUser/<str:username>", views.deleteAllUpdatesToCartAndSavedItemsForUser, name="Delete all Updates To Cart And Saved-Items For User"),
]