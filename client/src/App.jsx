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
import { ToastContainer } from 'react-toastify'
import Register from "./components/form/Register"

function App() {



  return (
    <div className="App">
      <ToastContainer
      />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
  )
}

export default App
