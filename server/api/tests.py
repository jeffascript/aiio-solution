from django.test import TestCase

# Create your tests here.
# djangoapp/tests.py

from django.urls import reverse
from rest_framework import status
from rest_framework.test import APITestCase
from .models import Product, SubCategory, SubProduct, HierarchyData

class ProductTests(APITestCase):
    def setUp(self):
        self.product = Product.objects.create(productId=1, productName="Electric Motors")
        self.subcategory = SubCategory.objects.create(subCategoryId=2, productId=self.product, subCategoryName="Current Collectors")
        self.subproduct = SubProduct.objects.create(subProductId=3, subCategoryId=self.subcategory, subProductName="Yellow Collectors")

    def test_get_product_list(self):
        url = reverse('product_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['products']), 1)

    def test_get_subcategory_list(self):
        url = reverse('subcategory_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['subcategories']), 1)

    def test_get_subproduct_list(self):
        url = reverse('subproduct_list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data['subproducts']), 1)

    def test_post_subproduct(self):
        url = reverse('subproduct_list')
        data = {
            'subProductId': 4,
            'subCategoryId': self.subcategory.subCategoryId,
            'subProductName': 'White Collectors'
        }
        response = self.client.post(url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)
        self.assertEqual(SubProduct.objects.count(), 2)

