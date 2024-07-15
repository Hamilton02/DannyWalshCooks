from django.db import models
from django.contrib.postgres.fields import ArrayField

# Create your models here.


class Category(models.Model):
  name = models.CharField(max_length=255, null=False, blank=False)


class Recipe(models.Model):
  title = models.CharField(max_length=255, null=False, blank=False)
  featured = models.BooleanField(null=True, blank=True, default=False)
  description = models.TextField(null=False, blank=False)
  prep_time = models.DurationField(null=False, blank=False)
  cook_time = models.DurationField(null=False, blank=False)
  ingredients = ArrayField(
    models.CharField(max_length=255, blank=False, null=False),
    blank=False,
    null=False
  )
  steps = ArrayField(
    models.TextField(null=False, blank=False),
    null=False,
    blank=False
  )
  category = models.ForeignKey(Category, on_delete=models.DO_NOTHING, null=False, blank=False)
  img = models.URLField(blank=True , null=True)




