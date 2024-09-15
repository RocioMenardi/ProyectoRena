from django.db import models
from entrega.models import Entrega

class ModeloBase:
    def borrado(self):
        self.activo = not self.activo
        self.save()

class Litro(models.Model, ModeloBase):
    cantidad = models.FloatField(null= True)
    activo= models.BooleanField(default=True) #para borrado lógico
    def __str__(self): #en el admin muestre el atributo (nombre) del objeto.
        return f"{self.cantidad}"

class TipoProducto(models.Model):
    nombre = models.CharField(max_length=50)
    descripcion = models.TextField(null=True, blank=True) #agregue null y blanck para que no sea obligatorio poner la descripcion
    def __str__(self): #en el admin muestre el atributo (nombre) del objeto.
        return f"{self.nombre}"

class Producto(models.Model, ModeloBase):
    costo = models.FloatField(null=True)
    precioVenta = models.FloatField( null=True)
    litro = models.ForeignKey(Litro, on_delete=models.SET_DEFAULT, default=0)
    tipoProducto = models.ForeignKey(TipoProducto, on_delete=models.CASCADE, related_name="productos")
    activo= models.BooleanField(default=True)
    def __str__(self): #en el admin muestre el atributo (nombre) del objeto.
        return f"{self.tipoProducto.nombre} - {self.litro.cantidad} L"

class ProductoEntrega(models.Model):
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE, related_name="productoEntrega")
    entrega = models.ForeignKey(Entrega,on_delete=models.CASCADE, related_name="productoEntrega")
    def __str__(self): #en el admin muestre el atributo (nombre) del objeto.
        return f"{self.entrega.fecha}"