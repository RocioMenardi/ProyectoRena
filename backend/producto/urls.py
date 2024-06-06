from django.contrib import admin
from django.urls import path, include
from .views import LitroAbm, TipoProductoAbm

urlpatterns = [
    path('litro/', LitroAbm.as_view(), name="Litro"),
    path('tipoProducto/', TipoProductoAbm.as_view(), name="TipoProducto"),
]
