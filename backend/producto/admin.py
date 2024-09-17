from django.contrib import admin
from .models import Producto, ProductoEntrega, TipoProducto,Litro

admin.site.register (Producto)
admin.site.register (ProductoEntrega)
admin.site.register (TipoProducto)
admin.site.register (Litro)