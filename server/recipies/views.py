from django.shortcuts import get_object_or_404, get_list_or_404
from recipies.models import Category, Recipe
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from recipies.serializers import RecipieSerializer, CategorySerializer
from recipies.utils import is_valid_recipe, is_valid_category

# Create your views here.

class RecipeViews(APIView):
  def get(self, request, *args, **kwargs):

    recipe_id = kwargs.get("pk", None)
    search = request.GET.get('search', None)
    featured = request.GET.get('featured', None)


    if(search):
      results = Recipe.objects.filter(title__icontains = search)
      recipie_serializers = RecipieSerializer(results, many="True")

      recipe_data = recipie_serializers.data

      for recipe in recipe_data:
        category = Category.objects.get(id = recipe['category'])
        category_serializer = CategorySerializer(category)
        recipe["category"] = category_serializer.data["name"]

      return Response(data={"recipes": recipe_data}, status=status.HTTP_200_OK)
    
    if(featured == True):
      results = Recipe.objects.filter(featured = True)
      recipie_serializers = RecipieSerializer(results, many="True")

      recipe_data = recipie_serializers.data

      for recipe in recipe_data:
        category = Category.objects.get(id = recipe['category'])
        category_serializer = CategorySerializer(category)
        recipe["category"] = category_serializer.data["name"]

      return Response(data={"recipes": recipe_data}, status=status.HTTP_200_OK)

    if(recipe_id):
      recipe = get_object_or_404(Recipe, id=recipe_id)
      recipie_serializer = RecipieSerializer(recipe)
      recipe_data = recipie_serializer.data

      category = Category.objects.get(id = recipe_data['category'])
      category_serializer = CategorySerializer(category)
      recipe_data["category"] = category_serializer.data["name"]

      return Response(data={"recipe": recipe_data}, status=status.HTTP_200_OK)
    else:
      recipies = Recipe.objects.order_by("title")
      recipie_serializers = RecipieSerializer(recipies, many="True")

      recipe_data = recipie_serializers.data

      for recipe in recipe_data:
        category = Category.objects.get(id = recipe['category'])
        category_serializer = CategorySerializer(category)
        recipe["category"] = category_serializer.data["name"]

      return Response(data={"recipes": recipe_data}, status=status.HTTP_200_OK)
    
  def post(self, request, *args, **kwargs):

    data = request.data

    if not is_valid_recipe(data):
      return Response( data={"error": "Invalid body request"}, status=status.HTTP_400_BAD_REQUEST)

    try:
      with transaction.atomic():
        recipe_serializer = RecipieSerializer(data=data.get("recipe"))
        if not recipe_serializer.is_valid():
          raise Exception("Error creating recipe")
        
        recipe = recipe_serializer.save()

        return Response(
          data={"message": "Successfully created recipe"},
          status=status.HTTP_200_OK
        )
    except Exception as e:
      return Response(data={"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
  def patch(self, request, *args, **kwargs):

    data = request.data

    if not is_valid_recipe(data):
      return Response(
        data={"Error": "Invalid body request"},
        status = status.HTTP_400_BAD_REQUEST
      )

    recipe_id = kwargs.get("pk", None)

    try:
      with transaction.atomic():
        recipe_instance = get_object_or_404(Recipe, id=recipe_id)
        recipe_serializer = RecipieSerializer(recipe_instance, data=data.get("recipe"))
        if not recipe_serializer.is_valid():
          raise Exception("error updating recipe")
        recipe_serializer.save()

        return Response(
          data={'message': "Recipe save successfully"},
          status= status.HTTP_200_OK
        )

    except Exception as e:
      return Response(
        data={"error": str(e)},
        status = status.HTTP_400_BAD_REQUEST
      )
    
  def delete(self, request, *args, **kwargs):

    recipe_id = kwargs.get("pk", None)

    try:
      with transaction.atomic():
        recipe_instance = get_object_or_404(Recipe, id=recipe_id)
        recipe_instance.delete()

        return Response(
          data={"message": "Succussfully deleted recipe"},
          status=status.HTTP_200_OK
        )
    except Exception as e:
      return Response(
        data = {"error": str(e)},
        status=status.HTTP_400_BAD_REQUEST
      )
    
class CategoryViews(APIView):
  def get(self, request, *args, **kwargs):

    category_id = kwargs.get("pk", None)

    base = request.GET.get("base", None)

    if(base):
      categories = get_list_or_404(Category)
      categories_serializer = CategorySerializer(categories, many="True")
      categories_data = categories_serializer.data

      return Response(
        data={"categories": categories_data},
        status=status.HTTP_200_OK
      )

    if(category_id):
      category = Category.objects.get(id = category_id)
      category_serializer = CategorySerializer(category)
      category_data = category_serializer.data
      
      category_recipies = Recipe.objects.filter(category = category)
      recipes_serializer = RecipieSerializer(category_recipies, many="True")
      category_data["recipes"] = recipes_serializer.data

      return Response(
        data = {"Category": category_data},
        status=status.HTTP_200_OK
      )
    else:
      categories = Category.objects.order_by("id")
      category_serializer = CategorySerializer(categories, many="True")
      categories_data = category_serializer.data
      
      for category in categories_data:
        category_recipies = Recipe.objects.filter(category = category["id"])
        recipes_serializer = RecipieSerializer(category_recipies, many="True")
        category["recipes"] = recipes_serializer.data

      return Response(
        data = {"Categories": categories_data},
        status=status.HTTP_200_OK
      )
    
  def post(self, request, *args, **kwargs):

    data = request.data

    if not is_valid_category(data):
      return Response(
        data = {"error": "Invalid request body"},
        status= status.HTTP_400_BAD_REQUEST
      )
    
    try:
      with transaction.atomic():
        category_serializer = CategorySerializer(data)
        if not category_serializer.is_valid():
          raise Exception("Error creating category")
        
        category = category_serializer.save()

        return Response(
          data={"message": "Successfully created category"},
          status=status.HTTP_200_OK
        )

    except Exception as e:
      return Response(data={"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)


  


