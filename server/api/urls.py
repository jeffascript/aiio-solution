from django.urls import path
from . import views

urlpatterns = [
    path('products', views.product_list),
    path('subproducts', views.subproduct_list),
    path('subcategories', views.subcategory_list)
]
