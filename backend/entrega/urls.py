from django.contrib import admin
from django.urls import path, include
from .views import Naftaabm, Clienteabm, Entregaabm

urlpatterns = [
    path('nafta/', Naftaabm.as_view(), name="Nafta"),
    path('cliente/', Clienteabm.as_view(), name="Cliente"),
    path('entrega/', Entregaabm.as_view(), name="Entrega"),
]
