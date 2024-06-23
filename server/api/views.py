from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status
from .models import Product, SubCategory, SubProduct, HierarchyData
from .serializers import ProductSerializer, SubCategorySerializer, SubProductSerializer, HierarchyDataSerializer

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

@api_view(['POST'])
def save_data(request):
    data = request.data

    try:
        for product_key, subcategories in data.items():
            product_id, product_name = product_key.split('-', 1)
            product = Product.objects.get(productId=product_id)

            for subcategory_dict in subcategories:
                for subcategory_key, subproducts in subcategory_dict.items():
                    prev_product_id, subcategory_id, subcategory_name = subcategory_key.split('-', 2)
                    subcategory = SubCategory.objects.get(subCategoryId=subcategory_id, productId=product)

                    for subproduct in subproducts:
                        prev_subcategory_id, subproduct_id, subproduct_name = subproduct.split('-', 2)
                        subproduct = SubProduct.objects.get(subProductId=subproduct_id, subCategoryId=subcategory)

                        # Save the hierarchy data
                        HierarchyData.objects.create(
                            product=product,
                            subCategory=subcategory,
                            subProduct=subproduct,
                            hierarchy={
                                'product': {'id': product.productId, 'name': product.productName},
                                'subcategory': {'id': subcategory.subCategoryId, 'name': subcategory.subCategoryName},
                                'subproduct': {'id': subproduct.subProductId, 'name': subproduct.subProductName}
                            }
                        )

        return Response(status=status.HTTP_201_CREATED)
    except Product.DoesNotExist:
        return Response({'error': 'Product does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except SubCategory.DoesNotExist:
        return Response({'error': 'SubCategory does not exist'}, status=status.HTTP_400_BAD_REQUEST)
    except SubProduct.DoesNotExist:
        return Response({'error': 'SubProduct does not exist'}, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
def get_data(request):
    hierarchy_data = HierarchyData.objects.all()
    serializer = HierarchyDataSerializer(hierarchy_data, many=True)
    return Response(serializer.data)
