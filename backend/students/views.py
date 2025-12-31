from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .models import Student
from .serializers import StudentSerializer


@api_view(['GET'])
def get_students(request):
    students = Student.objects.all()
    serializer = StudentSerializer(students, many=True)
    return Response(serializer.data)


@api_view(['POST'])
def bulk_create_students(request):
    many = isinstance(request.data, list)
    serializer = StudentSerializer(data=request.data, many=many)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Students added", "data": serializer.data}, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['PUT'])
def update_student(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
    serializer = StudentSerializer(student, data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response({"message": "Student updated", "data": serializer.data})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['DELETE'])
def delete_student(request, pk):
    try:
        student = Student.objects.get(pk=pk)
    except Student.DoesNotExist:
        return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
    student.delete()
    return Response({"message": "Student deleted"}, status=status.HTTP_200_OK)


@api_view(['POST'])
def bulk_delete_students(request):
    ids = request.data.get('ids', [])
    if not ids:
        return Response({"error": "No IDs provided"}, status=status.HTTP_400_BAD_REQUEST)
    deleted_count = Student.objects.filter(id__in=ids).delete()[0]
    return Response({"message": f"{deleted_count} students deleted"}, status=status.HTTP_200_OK)
