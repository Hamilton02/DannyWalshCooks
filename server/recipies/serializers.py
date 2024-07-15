from rest_framework import serializers
from recipies.models import Recipe, Category

class RecipieSerializer(serializers.ModelSerializer):
  class Meta:
        model = Recipe
        fields = "__all__"

class CategorySerializer(serializers.ModelSerializer):
  class Meta:
      model=Category
      fields="__all__"

