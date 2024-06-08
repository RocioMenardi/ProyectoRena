from django.contrib import admin
from .models import Producto, ProductoEntrega, TipoProducto

admin.site.register (Producto)
admin.site.register (ProductoEntrega)
admin.site.register (TipoProducto)