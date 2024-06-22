from rest_framework import serializers
from .models import Product, SubCategory, SubProduct

class SubProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = SubProduct
        fields = '__all__'

class SubCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = SubCategory
        fields = ['productId', 'subCategoryId', 'subCategoryName']
 

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = ['productId', 'productName']
