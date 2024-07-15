from recipies.views import (
  RecipeViews, 
  CategoryViews
)
from django.urls import path

urlpatterns = [
  path("recipes/", RecipeViews.as_view(), name="recipies"),
  path("recipes/<int:pk>/", RecipeViews.as_view(), name="recipies"),
  path("categories/", CategoryViews.as_view(), name="categories"),
  path("categories/<int:pk>/", CategoryViews.as_view(), name="category")
]