from django.contrib import admin
from django.urls import path, include
from .views import Naftaabm, Clienteabm

urlpatterns = [
    path('nafta/', Naftaabm.as_view(), name="Nafta"),
    path('cliente/', Clienteabm.as_view(), name="Cliente"),
]
