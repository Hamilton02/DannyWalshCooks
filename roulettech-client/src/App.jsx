import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Auth from './pages/Auth'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import Layout from './pages/Layout'
import Recipes from './pages/Recipes'
import RecipeDetail from './pages/RecipeDetail'


function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Auth />}>
          <Route />

          <Route element={<Layout /> }>
            <Route path='/app' element={<Recipes />} />
            <Route path='/app/recipe/:id' element={<RecipeDetail />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
