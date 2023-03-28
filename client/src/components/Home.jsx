import React, { useEffect } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { ToastContainer } from 'react-toastify';
import { getProducts } from '../../store/productsSlice'
import ProductItem from './ProductItem';
import 'react-toastify/dist/ReactToastify.css';

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts()) 
  }, [dispatch])
  
  const { products, isLoading, error } = useSelector(state=>state.productsReducres)

  return (
    <div className='bg-warning vh-100 p-5 d-flex items-center text-center'>
      <div className='container'>
      <h1 className='display-2 fw-bold text-light'>Featured Products</h1>

      {isLoading ? (
        <p>Loading...</p>
      ): error? (
        <p>An error occured...</p>
      ): (
        <div className='row gap-3 justify-content-center products py-5'>
          {products.map(product => (
            <ProductItem key={product.id} product={product} dispatch={dispatch}/>
          ))}
        </div>
      )}

<ToastContainer />
    </div>
    </div>
  )
}

export default Home
