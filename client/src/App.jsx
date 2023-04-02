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
import Register from './components/form/register'
import Login from './components/form/Login'
import { useDispatch } from 'react-redux'
import { loadUser } from './store/authSlice'
import CheckoutSuccess from './components/payment/CheckoutSuccess'
import Products from './components/admin/Products'
import Summary from './components/admin/Summary'
import CreateProducts from './components/admin/CreateProduct'
import AdminDashboard from './components/admin/AdminDashboard'
import { useSelector } from 'react-redux'

function App() {


  const dispatch = useDispatch();
  dispatch(loadUser());
  // const auth  = useSelector((state) => state.authReducer);
  // console.log({auth})
  return (
    <div className="App">
      <ToastContainer
      />
      <Navbar/>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/home" element={<Home/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout-success" element={<CheckoutSuccess/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} >
        <Route path="summary" element={<Summary />} />
        <Route path="products" element={<Products />} >
          <Route path="create-products" element={<CreateProducts />} />
        </Route>
        </Route>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
    </div>
  )
}

export default App
