from django.db import models
from django.contrib.auth.models import User

class Usuario(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='usuario')
    nombre= models.CharField(max_length=20,null= True)
    apellido= models.CharField(max_length=20, null= True)
    def __str__(self):
        return f"{self.nombre} {self.apellido}"
    