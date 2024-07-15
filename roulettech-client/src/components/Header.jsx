import {useState, useEffect, useRef} from 'react'
import {MagnifyingGlassIcon} from '@heroicons/react/24/solid'
import { useNavigate, useSearchParams } from 'react-router-dom'
import { searchRecipes } from '../calls'
import { useOutsideClick } from '../helpers'

const Header = ({setAddOpen, getAddOpen}) => {

  const navigate = useNavigate()
  const [searchOpen, setSearchOpen] = useState(false)

  return (
    <div className='flex flex-row bg-red-800 justify-between drop-shadow-xl w-full sticky top-0 z-40'>
      <img src='/DWD-transparent.png' className='h-32 mx-12 my-6'/>
      <div className='w-1/3 flex flex-row justify-evenly relative'>
        <button className='text-white text-xl' onClick={() => navigate('/app')}>Recipies</button>
        <button className='text-white text-xl' onClick={() => {setAddOpen(!getAddOpen())}}>+ Add Recipe</button>
        <button onClick={() => setSearchOpen(!searchOpen)}><MagnifyingGlassIcon height={32} width={32} color="#FFFFFF"/></button>
        {searchOpen ? <SearchBar setSearchOpen={setSearchOpen} /> : <></>}
      </div>
    </div>
  )
}

const SearchBar = ({setSearchOpen}) => {

  const [search, setSearch] = useState('')
  const [searchResults, setSearchResult] = useState(null)
  const [searchResultsOpen, setSearchResultsOpen] = useState(false)

  const ref = useRef()

  const mapResults = () => {
    if(searchResults){
      return searchResults.map((item, i) => 
        <ResultItem item={item} key={i} />
      )
    }
  }

  useEffect(() => {
    setSearchResultsOpen(true)
  }, [searchResults])

  useOutsideClick(ref, () => setSearchResultsOpen(false))


  return(
    <div className='fixed top-32 z-50'>
      <input className='p-1' type='search' onChange={(e) => setSearch(e.target.value)}/>
      <button className='rounded-sm bg-amber-300 m-2 p-1' onClick={() => searchRecipes(setSearchResult, search)}>Search</button>
      {searchResults && searchResultsOpen ?  
        <div ref={ref} className='overflow-y-scroll no-scrollbar max-h-52'>
          {mapResults()}
        </div>
        
      :
       <></>}
    </div>
  )
}

const ResultItem = ({item}) => {

  const navigate = useNavigate()

  return(
    <div className='flex flex-row bg-yellow-300 m-2 p-2 hover:bg-yellow-400 hover:shadow-lg hover:scale-105' onClick={() => navigate(`/app/recipe/${item.id}`)}>
      {item.img ? <img /> : <></>}
      <div className='flex flex-col'>
        <h2 className='text-xl'>{item.title}</h2>
        <p className='text-orange-800'>{item.category}</p>
      </div>
    </div>
  )
}

export default Header
