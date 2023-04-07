// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
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
import Summary from './components/admin/summaryComponents/Summary'
import CreateProducts from './components/admin/CreateProduct'
import ProductsList from './components/admin//list/ProductsList'
import AdminDashboard from './components/admin/AdminDashboard'
// import { useSelector } from 'react-redux'
import Orders from './components/admin/Orders'
import Users from './components/admin/Users'
import { getProducts } from './store/productsSlice'
import ProductDetails from './components/Details/ProductDetails'
import Order from './components/Details/Order'
import UserProfile from './components/Details/UserProfile'
import Footer from './components/Footer/Footer'

function App() {


  const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getProducts())
  // }, [dispatch])
  dispatch(getProducts())

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
        <Route path="/products/:id" element={<ProductDetails />} />
        <Route path="/orders/:id" element={<Order />} />
        <Route path="/users/:id" element={<UserProfile />} />
        <Route path="/admin" element={<AdminDashboard />} >
        <Route path="summary" element={<Summary />} />
        <Route path="users" element={<Users />} />
        <Route path="orders" element={<Orders />} />
        <Route path="products" element={<Products />} >
          <Route index element={<ProductsList />} />
          <Route path="create-products" element={<CreateProducts />} />
        </Route>
        </Route>
        <Route path="*" element={<ErrorPage/>}/>
      </Routes>
      <Footer/>
    </div>
  )
}

export default App
