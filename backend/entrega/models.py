from django.db import models
from usuario.models import Usuario

class ModeloBase:
    def borrado(self):
        self.activo = not self.activo
        self.save()

class Nafta(models.Model):
    precio_litro = models.FloatField()
    fecha = models.DateField(auto_now_add=True, null=True)

    def __str__(self): #en el admin muestre el atributo (nombre) del objeto.
        return f"{self.precio_litro}"

class Cliente(models.Model, ModeloBase):
    nombre = models.CharField(max_length=30)
    apellido = models.CharField(max_length=30)
    telefono = models.CharField(max_length=10, blank=True)
    direccion = models.CharField(max_length=50, blank=True)
    descripcion = models.TextField(blank=True)
    activo = models.BooleanField(default=True)
    def __str__(self): #en el admin muestre el atributo (nombre) del objeto.
        return f"{self.nombre} {self.apellido}"

class Entrega(models.Model, ModeloBase):
    fecha = models.DateField(auto_now_add=True) #para setear automaticamente la fecha y hora
    hora = models.TimeField(auto_now_add=True)
    cliente = models.ForeignKey(Cliente, on_delete=models.CASCADE, related_name="entrega") #con related_name permite traer todas las entregas relacionadas a un cliente, teniendo el objeto cliente.
    nafta = models.ForeignKey(Nafta, on_delete=models.SET_DEFAULT, default=0)
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE, related_name="entregasUsuario", null=True)
    activo = models.BooleanField(default=True)
    
    def __str__(self): #en el admin muestre el atributo (nombre) del objeto.
            return f"{self.cliente.nombre} {self.cliente.apellido} {self.fecha}"