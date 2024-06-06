from django.shortcuts import render
from rest_framework.views import APIView
from .models import Litro, TipoProducto
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
    
class TipoProductoAbm(APIView):
    def get(self,request):
        tipos = TipoProducto.objects.all() #obtengo todos los objetos tipo producto
        data = [] #necesito recorrerlos, creo una lista para almacenar los datos 

        for tipo in tipos: #Recorrer cada tipo de producto
            #Agregar los datos a la lista
            data.append({
                "id": tipo.id,
                "nombre": tipo.nombre,
                "descripcion": tipo.descripcion
            }
            )
        return Response({"TiposProducto": data}) #retorno la respuesta en json
    
    def post(self,request): #crear
        #Verificar que los campos nombre y descripcion estén presentes en la solicitud request.data
        if not "nombre" in request.data or not "descripcion" in request.data: 
            return Response({"Error":"Falta completar los campos nombre o descripcion"}, status=400)
            #Si alguno de los campos falta, retorna una respuesta de error y el estado HTTP 400 (Bad Request).

        #Obtener los valores de nombre y descripcion desde la solicitud
        nombre = request.data.get("nombre")
        descripcion = request.data.get("descripcion")

        # Verificar si ya existe un TipoProducto con el mismo nombre
        if not TipoProducto.objects.filter(nombre=nombre).exists():
            tipo = TipoProducto.objects.create(nombre=nombre, descripcion=descripcion)
            return Response({"Mensaje": "Nuevo tipo producto creado", "id":tipo.id}, status=200)
            #Si no existe, creo un nuevo TipoProducto.
        else: #Si ya existe el TipoProducto
            return Response({"Error": "Ya existe un tipo producto con ese nombre"}, status=400)
    
    def put(self,request): #Modificar
        #Verificar campo obligatorio id
        if not "id" in request.data:
            return Response({"Error": "Falta el id"}, status=400)
        
        #Obtener valor desde la solicitud
        id = request.data.get("id")

        #Intentar obtener el TipoProducto correspondiente
        try:
            tipo = TipoProducto.objects.get(id=id)
        except TipoProducto.DoesNotExist:
            return Response({"Error": "No existe el tipo producto"}, status=404)
        
        #Actualizar los campos proporcionados
        if "nombre" in request.data:
            tipo.nombre = request.data.get("nombre")
        if "descripcion" in request.data:
            tipo.descripcion = request.data.get("descripcion")

        #Guardar los cambios en la base de datos
        tipo.save()

        #Retornar respuesta de éxito
        return Response({"Mensaje": "Se modificó con éxito"}, status=200)

    def delete(self,request):
        #Verificar que el campo id esté en la solicitud
        if not "id" in request.data:
            return Response({"Error": "Falta el id"}, status=400)
        
        #Obtener el valor de id desde la solicitud
        id = request.data.get("id")

        #Intentar obtener el TipoProducto correspondiente al id proporcionado
        try:
            tipo = TipoProducto.objects.get(id=id)
        except TipoProducto.DoesNotExist:
            return Response({"Error": "No existe el tipo producto"}, status=404)
        
        #Eliminar el TipoProducto de la base de datos
        tipo.delete()
        return Response({"Se borró con éxito el tipo producto"}, status=200)
