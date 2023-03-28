import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './components/Nav'
import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Cart from  './components/Cart'
import ErrorPage from './components/ErrorPage'
import 'react-toastify/dist/ReactToastify.css';

function App() {



  return (
    <div className="App">
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
  )
}

export default App
