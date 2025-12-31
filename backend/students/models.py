from django.db import models


class Student(models.Model):
    roll_no = models.CharField(max_length=20, unique=True, default='0000')
    name = models.CharField(max_length=100)
    age = models.IntegerField()
    city = models.CharField(max_length=100)

    def __str__(self):
        return self.name
