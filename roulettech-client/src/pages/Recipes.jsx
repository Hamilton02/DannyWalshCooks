import {useState, useEffect} from 'react'
import { getCategories, getFeatured, getRecipes } from '../calls'
import { useNavigate } from 'react-router-dom'

const Recipes = () => {

  const [recipes, setRecipes] = useState([])
  const [categories, setCategories] = useState([])



  useEffect(() => {
    getFeatured(setRecipes)
    getCategories(setCategories)
  }, [])

  const displayRecipes = () => {
    if(recipes){
      return recipes.map(recipe => 
          <RecipeCard recipe={recipe} key={recipe.id} />
        )
    }
  }

  const displayCategories = () => {
    if(categories){
      return categories.map(category => 
        <CategoryItem category={category} key={category.id} />
      )
    }
  }

  return (
    <div className='w-full'>
      <h1 className='text-4xl'>Featured Recipes</h1>
      <div className='flex flex-row overflow-x-scroll no-scrollbar'>
        {displayRecipes()} 
      </div>
      {displayCategories()}
    </div>
  )
}

const RecipeCard = ({recipe}) => {

  const navigate = useNavigate()

  return(
    <div className='transition ease-in-out flex flex-col w-1/3 min-w-80 m-4 bg-red-200 justify-start p-5 rounded-lg hover:shadow-lg hover:-translate-y-1 hover:scale-105 duration-300 hover:bg-red-300' onClick={() => navigate(`/app/recipe/${recipe.id}`)}>
      <h2 className='text-xl'>{recipe.title}</h2>
      {recipe.img ? <img className='w-1/2 p-2' src={recipe.img} alt={`${recipe.title} image`}/> : <></>}
      <p>{recipe.description}</p>
      <p>Prep time: {recipe.prep_time}</p>
      <p>Cook time: {recipe.cook_time}</p>
    </div>
  )
}

const CategoryItem = ({category}) => {

  const displayRecipes = () => {
    if(category.recipes){
      return category.recipes.map(recipe => 
          <RecipeCard recipe={recipe} key={recipe.id} />
        )
    }
  }

  return (
  <div className='w-full'>
    <h1 className='text-3xl'>{category.name}</h1>
    <div className='flex flex-row overflow-x-scroll no-scrollbar'>
      {displayRecipes()}
    </div>
  </div>
  )
}

export default Recipes
