from django.db import models

class Product(models.Model):
    productId = models.AutoField(primary_key=True)
    productName = models.CharField(max_length=255)

    def __str__(self):
        return self.productName


class SubCategory(models.Model):
    subCategoryId = models.AutoField(primary_key=True)
    productId = models.ForeignKey(Product, related_name='subcategories', on_delete=models.CASCADE)
    subCategoryName = models.CharField(max_length=255)

    def __str__(self):
        return self.subCategoryName


class SubProduct(models.Model):
    subProductId = models.AutoField(primary_key=True)
    subCategoryId = models.ForeignKey(SubCategory, related_name='subproducts', on_delete=models.CASCADE)
    subProductName = models.CharField(max_length=255)

    def __str__(self):
        return self.subProductName
