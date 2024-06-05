from django.shortcuts import render
from rest_framework.views import APIView
from .models import Litro
from rest_framework.response import Response


class LitroAbm (APIView):
    def get(self, request): #mostrar
        litros = Litro.objects.all() #traemos todos los objetos de la clase litro
        data = [] #array de data

        for litro in litros: #recorro cada litro
            data.append({
                "litro": litro.cantidad #agrego la cantidad de cada litro
            })
        return Response({"Litros":data})
    
    def post(self, request): #crear
        if not "cantidad" in request.data: #si no esta cantidad
            return Response({"Error":"Falta el campo cantidad"}, status=400)
        cantidad = request.data.get("cantidad") #obtengo cantidad
        if not Litro.objects.filter(cantidad=cantidad).exists(): #si no existe cantidad
            litro = Litro.objects.create(cantidad=cantidad) #lo creo
            return Response({"Mensaje":"Litro creado exitosamente", "id":litro.id}, status=200)
        else:
            return Response({"Error": "Ya existe esa cantidad de litro"}, status=400)
    
    def put(self,request): #modificar
        if not "id" in request.data:
            return Response({"Error": "Falta el id"}, status=400)
        id = request.data.get("id")

        try:
            litro = Litro.objects.get(id=id)
        except Litro.DoesNotExist:
            return Response({"Error":"No existe"}, status=404)#cuando un objeto no existe el error es 404
        
        if "cantidad" in request.data:
            litro.cantidad = request.data.get("cantidad")
            litro.save()
            return Response({"Mensaje":"Se modificó con exito"}, status=200)
        else:
            return Response({"Error": "Falta el campo cantidad"}, status=400)
    
    def delete(self, request): #borrar
        if not "id" in request.data:
            return Response({"Error": "Falta el id"}, status=400)
        id = request.data.get("id")

        try:
            litro = Litro.objects.get(id=id)
        except Litro.DoesNotExist:
            return Response({"Error":"No existe"}, status=404)#cuando un objeto no existe el error es 404
        
        litro.delete()
        return Response({"Mensaje": "Litro se ha borrado con exito"})