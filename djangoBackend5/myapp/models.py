from django.db import models

class PastOrder(models.Model):
    productId = models.CharField(max_length=24)
    customerUsername = models.CharField(max_length=30)
    dateTimeOfPurchase = models.DateTimeField()
    optionsChosen = models.JSONField()
    countryOfPurchase = models.CharField(max_length=100)

    class Meta:
        app_label = 'use-default'
        db_table = 'pastOrders'
        unique_together = (('productId', 'customerUsername', 'dateTimeOfPurchase'))
    


class ProductRatingAndReview(models.Model):
    product_id = models.CharField(max_length=24)
    reviewer_username = models.CharField(max_length=30)
    rating = models.IntegerField()
    review = models.CharField(max_length=5000)
    date_time = models.DateTimeField()
    is_edited = models.BooleanField()
    country_of_customer = models.CharField(max_length=100)
    product_options_selected = models.JSONField()

    class Meta:
        app_label = 'use-psql'
        db_table = 'product_ratings_and_reviews'
        unique_together = (('product_id', 'reviewer_username', 'product_options_selected'))

