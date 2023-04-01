import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

export default function Products() {
  const navigate = useNavigate();
  const goToCreateProducts = () => {
    navigate("/admin/products/create-products") 
  }
  return (
    <div>
      <button
      onClick={goToCreateProducts} 
      className='mb-5 btn btn-dark'>Create Product</button>
      <Outlet/>
    </div>
  )
}
