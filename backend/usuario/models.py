from django.db import models
from django.contrib.auth.models import User
from rest_framework.exceptions import ValidationError


class ModeloBase:
    def cambioEstado(self):
        self.activo = not self.activo
        self.save()
    def comprobacionCampos(campos,request):  
        for campo in campos:
            if not campo in request.data:
                raise ValidationError({"error": f"Falta el campo: {campo}"})
                   
class Usuario(models.Model, ModeloBase):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='usuario')
    nombre= models.CharField(max_length=20,null= True)
    apellido= models.CharField(max_length=20, null= True)
    def __str__(self):
        return f"{self.nombre} {self.apellido}"
    