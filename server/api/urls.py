from django.urls import path
from . import views

urlpatterns = [
    path('products', views.product_list, name='product_list'),
    path('subproducts', views.subproduct_list, name='subproduct_list'),
    path('subcategories', views.subcategory_list, name='subcategory_list'),
    path('save', views.save_data, name='save_data'),
    path('data', views.get_data, name='get_data'),
]
 