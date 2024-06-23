from rest_framework import serializers
from .models import Product, SubCategory, SubProduct, HierarchyData

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


class HierarchyDataSerializer(serializers.ModelSerializer):
    class Meta:
        model = HierarchyData
        fields = ['product', 'subCategory', 'subProduct', 'hierarchy']
