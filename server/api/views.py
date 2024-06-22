from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Product, SubCategory, SubProduct
from .serializers import ProductSerializer, SubCategorySerializer, SubProductSerializer

# get all Products only based on the requirement of the task
@api_view(['GET'])
def product_list(request):
    if request.method == 'GET':
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response({'products':serializer.data})


# get all subcategories only based on the requirement of the task
@api_view(['GET'])
def subcategory_list(request):
    if request.method == 'GET':
        subcategories = SubCategory.objects.all()
        serializer = SubCategorySerializer(subcategories, many=True)
        return Response({'subcategories':serializer.data})

# GET all subcategories and POST a new subproduct based on the requirement of the task
@api_view(['GET', 'POST'])
def subproduct_list(request):
    if request.method == 'GET':
        subproducts = SubProduct.objects.all()
        serializer = SubProductSerializer(subproducts, many=True)
        return Response({'subproducts': serializer.data})
    elif request.method == 'POST':
        serializer = SubProductSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
