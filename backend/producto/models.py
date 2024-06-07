from django.db import models
from entrega.models import Entrega

class Litro(models.Model):
    cantidad = models.FloatField(null= True)
    def __str__(self): #en el admin muestre el atributo (nombre) del objeto.
        return f"{self.cantidad}"

class TipoProducto(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField()
    def __str__(self): #en el admin muestre el atributo (nombre) del objeto.
        return f"{self.nombre}"

class Producto(models.Model):
    costo = models.DecimalField(max_digits=10, decimal_places=2,null=True)
    precioVenta = models.DecimalField(max_digits=10, decimal_places=2, null=True)
    litro = models.ForeignKey(Litro, on_delete=models.SET_DEFAULT, default=0)
    tipoProducto = models.ForeignKey(TipoProducto, on_delete=models.CASCADE, related_name="productos")
    def __str__(self): #en el admin muestre el atributo (nombre) del objeto.
        return f"{self.tipoProducto.nombre} - {self.litro.cantidad} L"

class ProductoEntrega(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name="productoEntrega")
    entrega = models.ForeignKey(Entrega,on_delete=models.CASCADE, related_name="productoEntrega")
    def __str__(self): #en el admin muestre el atributo (nombre) del objeto.
        return f"{self.entrega.fecha}"