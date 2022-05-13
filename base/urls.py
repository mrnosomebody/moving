from django.urls import path
from .views import main, moving, delivery

urlpatterns = [
    path('', main, name='main'),
    path('moving/', moving, name='moving'),
    path('delivery/', delivery, name='delivery'),
]