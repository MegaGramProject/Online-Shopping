from django.db import models
from mongoengine import Document, fields
from bson import ObjectId

class Product_Page_Viewer(models.Model):
    id = models.AutoField(primary_key=True)
    product_id = models.CharField(max_length=24)
    username = models.CharField(max_length=30)
    date_time = models.DateTimeField()

    class Meta:
        db_table = 'product_page_viewers'
        unique_together = (('product_id', 'username'))
    

class UpdatesOfCartsAndSavedItems(Document):
    _id = fields.ObjectIdField(primary_key=True, default=ObjectId)
    username = fields.StringField(max_length=30)
    productId = fields.StringField(max_length=24)
    options = fields.DictField()
    productName = fields.StringField(max_length=200)
    prices = fields.ListField(fields.DynamicField())
    inCart = fields.BooleanField()

    meta = {
        'collection': 'updatesOfCartsAndSavedItems'
    }

