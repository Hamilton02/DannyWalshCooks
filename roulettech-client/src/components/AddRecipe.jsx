import {useState, useEffect, useRef} from 'react'
import { getBaseCategories, postRecipe } from '../calls'
import { standardizeDuration, useOutsideClick } from '../helpers'
import { MinusCircleIcon } from '@heroicons/react/24/outline'

const AddRecipe = ({setAddRecipe, setMessage}) => {

  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [featured, setFeatured] = useState(false)
  const [prep_time, setPreptime] = useState('')
  const [cook_time, setCooktime] = useState('')
  const [ingredients, setIngredients] = useState([])
  const [steps, setSteps] = useState([])
  const [img, setImg] = useState('')
  const [category, setCategory] = useState()

  const [baseCategories, setBaseCategories] = useState([])

  const ref = useRef()

  useOutsideClick(ref, () => setAddRecipe(false))

  const data = {
    "recipe":{
      "title": title,
      "featured": featured === 'on' ? true : false,
      "description": description,
      "prep_time": prep_time,
      "cook_time": cook_time,
      "ingredients": ingredients,
      "steps": steps,
      "img": img,
      "category": category
    }
  }

  useEffect(() => {
    getBaseCategories(setBaseCategories)
  }, [])

  const generateOptions = () => {
    if(baseCategories){
      return baseCategories.map(category => 
          <option value={category.id} key={category.id}>{category.name}</option>

        )
    }
  }

  const handleSubmit = () => {
    postRecipe(data, setMessage)
    setAddRecipe(false)
  }

  return (
    <div className='flex flex-col w-1/3 bg-red-900 fixed z-50 left-1/2 top-2/4 -translate-y-1/2 -translate-x-1/2 h-2/3 justify-center items-center text-white rounded-lg drop-shadow-xl' ref={ref}>
      <button className="self-end my-4 mx-8 hover:text-red-400" onClick={() => setAddRecipe(false)}>X</button>
      
      <h2 className='text-2xl justify-self-center'>Add Recipe</h2>

      <div className='flex flex-col m-4 overflow-y-scroll w-2/3 no-scrollbar'>
        <InputField name={'Title'} setItem={setTitle} type={'text'} />
        <div className='flex flex-row justify-between m-2 items-start'>
            <label>Description:</label>
            <textarea type="text" className='text-black resize-none' rows='3' onChange={(e) => setDescription(e.target.value)}/>
        </div>
        <InputField name={'Featured'} setItem={setFeatured} type={'checkbox'} />
        <TimeItem name={'Prep Time'} setTime={setPreptime}/>
        <TimeItem name={'Cook Time'} setTime={setCooktime} />
        <ListField name={'Ingredients'} setItem={setIngredients} order={false} />
        <ListField name={'Steps'} setItem={setSteps} order={true} />
        <InputField name={'Image'} setItem={setImg} type={'url'} />
        <div className='flex flex-row justify-between m-2 items-start'>
          <label>Category</label>
          <select onChange={(e) => setCategory(e.target.value)}  className='text-black' >
            <option value="" selected="true" disabled="disabled" className='opacity-50'>Select</option>
            {generateOptions()}
          </select>
        </div>
        <button className='bg-amber-600 rounded-md' onClick={() => handleSubmit()}>Submit</button>
      </div>
    </div>
  )
}

const TimeItem = ({setTime, name}) => {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    setTime(standardizeDuration(hours, minutes, seconds))
  }, [seconds, minutes, hours])

  return(
    
    <div className='flex flex-row justify-between m-2 items-center '>
      <label>{name}</label>
      <div className='flex flex-row text-black'>
        <input className='w-12' type='number' max={24} min={0} onChange={(e) => setHours(e.target.value) }/>
        <p className='text-white'>:</p>
        <input className='w-12' type='number' max={60}  min={0} onChange={(e) => setMinutes(e.target.value) }/>
        <p className='text-white'>:</p>
        <input className='w-12' type='number' max={60}  min={0} onChange={(e) => setSeconds(e.target.value) }/>
      </div>
    </div>
  )
}

const InputField = ({name, setItem, type}) => {

  return(
    <div className='flex flex-row justify-between m-2 items-center'>
            <label>{name}:</label>
            <input className={`text-black focus:ring-2 focus:ring-red-800 ${type === 'checkbox' ? 'scale-150 justify-self-center self-center ' : ''}`} type={type} onChange={(e) => setItem(e.target.value)}/>
    </div>
  )
}

const ListField = ({name, setItem, order}) => {
  
  const [itemArr, setItemArr] = useState([""])

  const updateItems = (data, i) => {
    let arr = [...itemArr];
    arr[i] = data;
    setItemArr(arr)
    setItem(arr)
  }

  const deleteItem = (i) => {
    let arr = [...itemArr]
    arr.splice(i, 1)
    setItemArr(arr)
  }
  

  const mapItems = () => {
    return itemArr.map((item, i) => 
      <li className='flex flex-row items-center' key={i} >
        {order ? <p>{i+1}</p> : <></> }
        <input value={item || ""} className='m-2 text-black' type="text" onChange={(e) => updateItems(e.target.value, i)}/>
        <button onClick={() => deleteItem(i)}><MinusCircleIcon height={24} width={24} color='#FFFFFF' /></button>
      </li>
    )
  }
 
  const addItem = () => {
    let arr = [...itemArr]
    arr.push('')
    setItemArr(arr)
  }
  
  return(
    <div className='flex flex-col justify-between m-2 items-center w-full'>
      <div className='flex w-11/12 justify-between'>
        <label>{name}:</label>
        <button onClick={() => addItem()}>+ Add {name.substring(0, name.length-1)}</button>
      </div>
      {order ? 
        <ol className='list-decimal'>
          {mapItems()}
        </ol>
        :
        <ul>
          {mapItems()}
        </ul>
      }
    </div>
  )

  
}

export default AddRecipe
