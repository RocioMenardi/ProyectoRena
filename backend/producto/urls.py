from django.contrib import admin
from django.urls import path, include
from .views import LitroAbm, TipoProductoAbm, Productoabm

urlpatterns = [
    path('litro/', LitroAbm.as_view(), name="Litro"),
    path('tipoProducto/', TipoProductoAbm.as_view(), name="TipoProducto"),
    path('producto/', Productoabm.as_view(), name="Producto"),
]
