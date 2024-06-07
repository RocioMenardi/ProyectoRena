from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import Nafta, Cliente

class Naftaabm(APIView):
    def get(self,request):
        naftas = Nafta.objects.all() #obtengo todas las naftas
        data = []

        for nafta in naftas:
            data.append({
                "id": nafta.id,
                "precio litro": nafta.precio_litro,
            }
            )
        return Response({"Precio litro":data}, status=200)
    
    def post(self,request):
        if not "precio_litro" in request.data:
            return Response({"Error": "Falta el campo precio litro"}, status=400)
        
        precio_litro = request.data.get("precio_litro")
        if not Nafta.objects.filter(precio_litro=precio_litro).exists():
            naftaprecio = Nafta.objects.create(precio_litro=precio_litro)
            return Response({"Mensaje":"Se creó con éxito", "id":naftaprecio.id}, status=200)
        else:
            return Response({"Error":"Ya existe ese precio"}, status=400)
    
    def put(self, request):
        if not "id" in request.data:
            return Response({"Error": "Falta el id"}, status=400)
        
        id = request.data.get("id")
        try:
            nafta = Nafta.objects.get(id=id)
        except Nafta.DoesNotExist:
            return Response({"Error":"No existe"}, status=404)
        
        if "precio_litro" in request.data:
            nafta.precio_litro = request.data.get("precio_litro")
            nafta.save()
            return Response({"Mensaje": "Se modificó con éxito"}, status=200)
        else:
            return Response({"Error": "Falta el campo precio litro"}, status=400)
        
    def delete(self, request):
        if not "id" in request.data:
            return Response({"Error": "Falta el id"}, status=400)
        
        id = request.data.get("id")
        try:
            nafta = Nafta.objects.get(id=id)
        except Nafta.DoesNotExist:
            return Response({"Error": "No existe"}, status=404)
        
        nafta.delete()
        return Response({"Nafta se ha borrado con éxito"}, status=200)
    
class Clienteabm(APIView):
    def get(self,request):
        clientes = Cliente.objects.all()
        data = []

        for cliente in clientes:
            data.append({
                "nombre":cliente.nombre,
                "apellido":cliente.apellido,
                "telefono":cliente.telefono,
                "direccion":cliente.direccion,
                "descripcion":cliente.descripcion,
                "activo":cliente.activo,
            })
        return Response({"Clientes":data}, status=200)
    
    def post(self,request):
        if not "nombre" in request.data or not "apellido" in request.data:
            return Response({"Error":"Falta el campo nombre o apellido"}, status=400)
        
        nombre = request.data.get("nombre")
        apellido = request.data.get("apellido")
        telefono = request.data.get("telefono")
        direccion = request.data.get("direccion")
        descripcion = request.data.get("descripcion")
        activo = request.data.get("activo")

        if not Cliente.objects.filter(nombre=nombre, apellido=apellido).exists():
            cliente = Cliente.objects.create(
                nombre=nombre, 
                apellido=apellido, 
                telefono=telefono,
                direccion=direccion,
                descripcion=descripcion,
                activo=activo,
                )
            return Response({"Mensaje": "Cliente creado", "id":cliente.id}, status=200)
        else:
            return Response({"Error": "El cliente ya existe"}, status=400)
    
    def put(self,request):
        if not "id" in request.data:
            return Response({"Error":"Falta el id"}, status=400)
        id= request.data.get("id")

        try:
            cliente = Cliente.objects.get(id=id)
        except Cliente.DoesNotExist:
            return Response({"Error":"No existe ese Cliente"}, status=404)
        
        if "nombre" in request.data:
            cliente.nombre = request.data.get("nombre")
        if "apellido" in request.data:
            cliente.apellido = request.data.get("apellido")
        if "telefono" in request.data:
            cliente.telefono = request.data.get("telefono")
        if "direccion" in request.data:
            cliente.direccion = request.data.get("direccion")
        if "descripcion" in request.data:
            cliente.descripcion = request.data.get("descripcion")
    
        cliente.save()
        return Response({"Mensaje":"Se modificó con éxito el cliente"}, status=200)
    
    def delete(self,request):
        if not "id" in request.data:
            return Response({"Error":"Falta el id"}, status=400)
        id = request.data.get("id")

        try:
            cliente = Cliente.objects.get(id=id)
        except Cliente.DoesNotExist:
            return Response({"Error":"No existe ese cliente"}, status=404)
        
        cliente.delete()
        return Response({"El cliente se ha borrado con éxito"}, status=200)