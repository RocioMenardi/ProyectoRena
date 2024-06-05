from django.contrib import admin
from django.urls import path, include
from .views import LitroAbm

urlpatterns = [
    path('litro/', LitroAbm.as_view(), name="Litro"),
]
