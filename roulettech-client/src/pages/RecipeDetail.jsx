import {useState, useEffect} from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { getRecipe } from '../calls'
import { calculateTotalTime } from '../helpers'

const RecipeDetail = () => {

  const [recipe, setRecipe] = useState(null)
  const {id} = useParams()


  useEffect(() => {
    getRecipe(setRecipe, id)
  }, [])

  const mapIngredients = (ingredients) => {
    return ingredients.map((ingredient, i) => 
        <ListItem item={ingredient} key={i} />
       
      ) 
  }

  const mapSteps = (steps) => {
    return steps.map((step, i) => 
      <ListItem item={step} key={i} />
    )
  }

  return (
    <div>
      {recipe ? 
      <div className='w-full flex flex-col items-center'>
        <div className='flex flex-row w-full justify-evenly'>
          <div className='w-1/3'>
            <div className='flex flex-row w-full justify-between items-center'>
              <h1 className='text-5xl'>{recipe.title}</h1>
              <h2 className='text-xl text-orange-800'>{recipe.category}</h2>
            </div>
            <div className='flex flex-row w-full '>
              <p className='p-2'>Prep Time: <span className='text-red-700'>{recipe.prep_time}</span></p>
              <p className='p-2'>Cook Time: <span className='text-red-700'>{recipe.cook_time}</span></p>
              <p className='p-2'>Total Time: <span className='text-red-700'>{calculateTotalTime(recipe.prep_time, recipe.cook_time)}</span></p>
            </div>
          </div>
          {recipe.img ? <img src={recipe.img} className='w-1/5' alt={`${recipe.title} image`} /> : <></> }
        </div>
        <div className='flex flex-row justify-evenly w-full'>
          <div className='w-1/3'> 
            <h2 className='text-2xl'>Ingredients</h2>
            <ul>
              {mapIngredients(recipe.ingredients)}
            </ul>

          </div>
          <p className='w-1/3 text-lg'>{recipe.description}</p>
        </div>
        <div className='w-3/4 my-4'>
          <h2 className='text-2xl'>Steps</h2>
          <ol className='list-decimal list-inside'>
            {mapSteps(recipe.steps)}
          </ol>
        </div>
      </div>
      
      :

      <></>
    }
     </div>
  )
}

const ListItem = ({item}) => {
  const [crossed, setCrossed] = useState()

  return (
    <li className={`transition duration-100 w-full bg-red-300 m-1 py-1 px-4 rounded-sm hover:shadow-md hover:bg-red-400 hover:scale-y-105 ${crossed ? 'line-through' : ''}`} onClick={() => setCrossed(!crossed)}>{item}</li>
  )

}



export default RecipeDetail
