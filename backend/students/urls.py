from django.urls import path
from . import views

urlpatterns = [
    path('students/', views.get_students),
    path('students/bulk/', views.bulk_create_students),
    path('students/bulk/delete/', views.bulk_delete_students),
    path('students/<int:pk>/', views.update_student),
    path('students/<int:pk>/delete/', views.delete_student),
]
