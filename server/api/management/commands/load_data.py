# myapp/management/commands/load_data.py

import json
from django.core.management.base import BaseCommand
from api.models import Product, SubCategory, SubProduct

class Command(BaseCommand):
    help = 'Load initial data from JSON files'

    def handle(self, *args, **kwargs):
        with open('products.json') as f:
            products_data = json.load(f)
            for product in products_data['products']:
                Product.objects.create(**product)

        with open('subcategories.json') as f:
            subcategories_data = json.load(f)
            for subcategory in subcategories_data['subcatergories']:
                SubCategory.objects.create(**subcategory)

        with open('subproducts.json') as f:
            subproducts_data = json.load(f)
            for subproduct in subproducts_data['subproducts']:
                SubProduct.objects.create(**subproduct)

        self.stdout.write(self.style.SUCCESS('Data loaded successfully'))


 