from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.pagination import PageNumberPagination
from .models import Nafta, Cliente, Entrega
from usuario.models import Usuario
from producto.models import Producto, ProductoEntrega


def calcularTotal(productos):
        total=0
        for producto in productos:
            total+= producto.producto.precioVenta 
        return(total)

class Naftaabm(APIView):
    def get(self,request):
        naftas = Nafta.objects.all() #obtengo todas las naftas
        data = []

        for nafta in naftas:
            data.append({
                "id": nafta.id,
                "precio_litro": nafta.precio_litro,
                "fecha": nafta.fecha,
            })
        return Response({"Precio_litro":data}, status=200)
    
    def post(self,request):
        if not "precio_litro" in request.data:
            return Response({"Error": "Falta el campo precio litro"}, status=400)
        
        precio_litro = request.data.get("precio_litro")

        if not Nafta.objects.filter(precio_litro=precio_litro).exists():
            naftaPrecio = Nafta.objects.create(precio_litro=precio_litro)
            return Response({"Mensaje":"Se creó con éxito", "id":naftaPrecio.id}, status=200)
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
        clientes = Cliente.objects.filter(activo=True) #cambie el all() por filter para que me traiga los que estan activos
        data = []

        for cliente in clientes:
            data.append({
                "id":cliente.id,
                "nombre":cliente.nombre,
                "apellido":cliente.apellido,
                "telefono":cliente.telefono,
                "direccion":cliente.direccion,
                "descripcion":cliente.descripcion,
                #"activo":cliente.activo, No hace falta mostrar el activo ya que solo vamos a mostrar los clientes que esten activos. Porque los q estan desactivados son los 'borrados'
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
        #activo = request.data.get("activo") No hace falta pasar el activo ya que se setea por defualt en True

        if not Cliente.objects.filter(nombre=nombre, apellido=apellido).exists():
            cliente = Cliente.objects.create(
                nombre=nombre, 
                apellido=apellido, 
                telefono=telefono,
                direccion=direccion,
                descripcion=descripcion
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
        
        cliente.borrado() #cambie el delete por el borrado, para que lo desactive
        return Response({"Mensaje": "El cliente se ha borrado con éxito","activo": cliente.activo}, status=200)

class Entregaabm(APIView):

    def get(self,request):

        entregas = Entrega.objects.filter(activo=True).order_by('-id')
        
        paginator = PageNumberPagination()
        paginator.page_size = 15  # Puedes ajustar el tamaño de la página según sea necesario
        paginated_entregas = paginator.paginate_queryset(entregas, request)

        data = []
        

        for entrega in paginated_entregas:
            productos= entrega.productoEntrega.all()
            # Serializar los productos
            productos_data = []

            for producto_entrega in productos:
                productos_data.append({
                    "producto_id": producto_entrega.producto.id,
                    "nombre": producto_entrega.producto.tipoProducto.nombre,
                    "cantidad": producto_entrega.producto.litro.cantidad,
                    "precioVenta":producto_entrega.producto.precioVenta
                })
            
            nombre_cliente= f"{entrega.cliente.nombre} {entrega.cliente.apellido}"
            data.append({
                "id": entrega.id,
                "fecha": entrega.fecha,
                "hora":entrega.hora.strftime('%H:%M'),
                "cliente": nombre_cliente,
                "nafta": entrega.nafta.precio_litro,
                "usuario": entrega.usuario.nombre,
                "Total": calcularTotal(productos),
                "productos":productos_data,
            })

        return paginator.get_paginated_response({"Entregas": data})
    
    def post(self,request):

        if not all(key in request.data for key in ["cliente", "nafta", "usuario","productos"]):
            return Response({"Error": "Faltan los campos obligatorios"}, status=400)
        
        #obtengo los valores
        fecha = request.data.get("fecha")
        hora = request.data.get("hora")
        cliente_id = request.data.get("cliente")
        nafta_id = request.data.get("nafta")
        usuario_id = request.data.get("usuario")
        productos= request.data.get("productos")

        try:
            cliente = Cliente.objects.get(id=cliente_id)
        except Cliente.DoesNotExist:
            return Response({"Error":"No existe el cliente"}, status=404)
        
        try: 
            nafta = Nafta.objects.get(id=nafta_id)
        except Nafta.DoesNotExist:
            return Response({"Error":"No existe nafta"}, status=404)
        
        try:
            usuario = Usuario.objects.get(id=usuario_id)
        except Usuario.DoesNotExist:
            return Response({"Error":"No existe el usuario"}, status=404)
        
        #crear entrega
        entrega = Entrega.objects.create(
            fecha = fecha,
            hora = hora,
            cliente = cliente,
            nafta = nafta,
            usuario = usuario,
        )

        productos_data=[]
        for producto_id in productos:
            try:
                producto=Producto.objects.get(id=producto_id)
                ProductoEntrega.objects.create(producto= producto, entrega= entrega)
                productos_data.append({"id":producto.id, "nombre":producto.tipoProducto.nombre})

            except Producto.DoesNotExist:
                return Response({"error":f"el producto {producto_id} no existe"}, status=404)

        return Response({"Mensaje":"La entrega se creó con éxito",
                         "id": entrega.id,
                         "productos asignados": productos_data}, status=200)
    
    def put(self,request):
        if not "id" in request.data:
            return Response({"Error": "Falta el id"}, status=400)
        
        id = request.data.get("id")

        try:
            entrega = Entrega.objects.get(id=id)
        except Entrega.DoesNotExist:
            return Response({"Error":"No existe la entrega"}, status=404)
        
        #actualizar 
        if "fecha" in request.data:
            entrega.fecha = request.data.get("fecha")
        if "hora" in request.data:
            entrega.hora = request.data.get("hora")
        if "cliente" in request.data:
            entrega.cliente = request.data.get("cliente")
        if "nafta" in request.data:
            entrega.nafta = request.data.get("nafta")
        if "usuario" in request.data:
            entrega.usuario = request.data.get("usuario")

        entrega.save()
        return Response({"Mensaje": "La entrega se modificó con éxito"}, status=200)
    
    def delete(self,request):
        if not "id" in request.data:
            return Response({"Error":"Falta el id"}, status=400)
        
        id=request.data.get("id")

        try:
            entrega = Entrega.objects.get(id=id)
        except Entrega.DoesNotExist:
            return Response({"Error":"La entrega no existe"}, status=404)
        
        entrega.borrado()
        return Response({"Mensaje":"La entrega se borró con éxito", "activo":entrega.activo}, status=200)