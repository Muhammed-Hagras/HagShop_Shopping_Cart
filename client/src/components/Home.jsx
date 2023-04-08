import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from "react-redux"
import { getProducts } from './../store/productsSlice'
import ProductItem from './ProductItem';
import 'react-toastify/dist/ReactToastify.css';
import Slider from './Slider/Slider';
import Contact from './Contact/Contact';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../store/cartSlice';
import { motion } from "framer-motion";

const Home = () => {
  const dispatch = useDispatch()
  const addToCartHandler = (product) => {
    dispatch(addToCart(product));
  };
  
  const navigate = useNavigate();
  
  const { products, isLoading, error } = useSelector(state=>state.productsReducres)

  const SlicedProducts = products.slice(0, 8);

  const [filter, setFilter] = useState(products);

  const filteredProducts  = (categ) => {
    const updatedList = products.filter(x=> x.brand === categ);
    setFilter(updatedList);
  }
  console.log(filter)

  return (
    <>
     <Slider/>

    <div className='bg-light h-100 p-5 d-flex items-center text-center'>
    
      
      <div className='container'>
      <motion.h1 className='display-2 fw-bold text-dark'
       initial={{ rotate: 0 }}
       animate={{
           rotate: 360,
       }}
       transition={{
         type: "spring",
         stiffness: 260,
         damping: 20,
         duration:7
       }}
      >Featured Products</motion.h1>


      {isLoading ? (
        <p>Loading...</p>
      ): error? (
        <p>An error occured...</p>
      ): (
        <div className='row gap-3 justify-content-center products py-5'>
          {SlicedProducts.map(product => (
          
            <ProductItem key={product._id} product={product} addToCartHandler={addToCartHandler} />
          ))}
          <Button className='btn btn-primary  fs-5 shadow mt-5' style={{width: "250px"}}
          onClick={() => navigate("/products")}
         >Show More </Button>
        </div>
      )}

    </div>
    </div>
    {/* <Contact/> */}
    </>
  )
}

export default Home
