import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getProducts } from './../store/productsSlice'
import ProductItem from './ProductItem';
import 'react-toastify/dist/ReactToastify.css';
import Slider from './Slider/Slider';
import Contact from './Contact/Contact';

const Home = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getProducts()) 
  }, [dispatch])
  
  const { products, isLoading, error } = useSelector(state=>state.productsReducres)

  const [filter, setFilter] = useState(products);

  const filteredProducts  = (categ) => {
    const updatedList = products.filter(x=> x.brand === categ);
    setFilter(updatedList);
  }
  console.log(filter)

  return (
    <>
     <Slider/>
     <>
     <div className="buttons d-flex justify-content-center my-5 pb-5">
          <button className="btn btn-outline-dark me-2" 
          onClick={() => {setFilter(products)}}>
            ALL
            </button>
            <button
            className="btn btn-outline-dark me-2"
            onClick={() => {
              filteredProducts("lab");
            }}
          >
            Lab
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => {
              filteredProducts("samsung");
            }}
          >
            Samsung
          </button>
          <button
            className="btn btn-outline-dark me-2"
            onClick={() => {
              filteredProducts("other");
            }}
          >
            Other
          </button>
        </div>
     </>

    <div className='bg-light h-100 p-5 d-flex items-center text-center'>
    
      
      <div className='container'>
      <h1 className='display-2 fw-bold text-dark'>Featured Products</h1>

      {isLoading ? (
        <p>Loading...</p>
      ): error? (
        <p>An error occured...</p>
      ): (
        <div className='row gap-3 justify-content-center products py-5'>
          {products.map(product => (
            <ProductItem key={product._id} product={product} dispatch={dispatch}/>
          ))}
        </div>
      )}

    </div>
    </div>
    <Contact/>
    </>
  )
}

export default Home
