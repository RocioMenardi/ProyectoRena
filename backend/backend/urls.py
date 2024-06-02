from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('entrega/', include('entrega.urls')),
    path('producto/', include('producto.urls')),
    path('usuario/', include('usuario.urls'))
]
