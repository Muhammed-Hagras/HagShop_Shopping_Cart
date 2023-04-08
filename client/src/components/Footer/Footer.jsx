import React from 'react'

import "./Footer.scss"

export default function Footer() {
  return (
    <div className='footer'>
      <div className="top">
        <div className="item">
          <h1>Categories</h1>
          <span>Labs</span>
          <span>Tablets</span>
          <span>Phones</span>
          <span>Women</span>
          <span>Men</span>
        </div>
        <div className="item">
          <h1>Links</h1>
          <span>FAQ</span>
          <span>Pages</span>
          <span>Stores</span>
          <span>Compare</span>
          <span>Cookies</span>
        </div>
        <div className="item">
          <h1>About</h1>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita sit ducimus officiis nesciunt quod perferendis molestiae, earum libero blanditiis quisquam eaque. Nesciunt aliquid quisquam culpa sequi delectus voluptatibus dicta tempore!</span>
        </div>
        <div className="item">
          <h1>Contact</h1>
          <span>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur quam quas esse dolorem tempore recusandae vel et nemo totam officiis distinctio quasi expedita quae, velit fugiat culpa autem? Repellat, minima!</span>
        </div>
      </div>
      <div className="bottom">
        <div className="left">
          <span className="logo">HagrasShopping</span>
          <span className="copyrigh">© Copyright 2023. All Rights Reserved</span>
        </div>
        <div className="right">
          <img className='img' src='/img/payment.png' alt=''/>
        </div>
      </div>
    </div>
  )
}
