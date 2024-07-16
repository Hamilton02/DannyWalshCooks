import axios from "axios";
import { redirect, useNavigate } from "react-router";
import { useEffect, useState } from "react";

const http = axios.create({
  baseURL: 'http://3.147.127.58'  /*'http://localhost:8000' */, 
  headers: {
    "Content-type": "application/json",
  }
});

export const getRecipes = async(setRecipes) => {

  http.get('/api/recipes/')
  .then(result => {
    console.log(result)
    setRecipes(result.data.recipes)
  })
  .catch(error => {
    console.error(error)
  })
}

export const searchRecipes = async(setSearchResult, search) => {
  http.get('/api/recipes/', {params:{"search": search}})
    .then(result => {
      console.log(result)
      setSearchResult(result.data.recipes)
    })
    .catch(error => {
      console.error(error)
    })
}

export const getFeatured = async(setRecipes) => {
  http.get('/api/recipes/', {params:{"featured": true}})
    .then(result => {
      console.log(result)
      setRecipes(result.data.recipes)
    })
    .catch(error => {
      console.error(error)
    })
}

export const getRecipe = async(setRecipe, id) => {
  http.get(`/api/recipes/${id}/`)
  .then(result => {
    console.log(result)
    setRecipe(result.data.recipe)
  })
  .catch(error => {
    console.error(error)
  })
}

export const postRecipe = async(data, setMessage) => {
  http.post('/api/recipes/', data)
  .then(result => {
    console.log(result)
    if(result.status === 200){
      setMessage("Successfully Added Recipe.")
    }
  })
  .catch(err => {
    console.log(err)
    setMessage("Error Adding Recipe.")
  })
}

export const getCategories = async(setCategories) => {
  http.get(`/api/categories/`)
  .then(result => {
    console.log(result)
    setCategories(result.data.Categories)
  })
  .catch(error => {
    console.error(error)
  })
}

export const getCategory = async(setCategory, id) => {
  http.get(`/api/categories/${id}/`)
  .then(result => {
    console.log(result)
    setCategory(result.data.category)
  })
  .catch(error => {
    console.error(error)
  })
}

export const getBaseCategories = async(setCategories) => {
  http.get(`/api/categories/?base=True`)
  .then(result => {
    console.log(result)
    setCategories(result.data.categories)
  })
  .catch(error => {
    console.error(error)
  }) 
}