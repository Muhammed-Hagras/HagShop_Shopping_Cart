import React  from 'react'
import { Carousel } from 'react-bootstrap'
export default function Slider() {

  return (
    <div className='slider'>
      <Carousel className=''>
      <Carousel.Item className='card-img-overlay'>
        <img
          className="slideImg d-block w-100"
          src="/assets/slide-1.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3 className='card-title text-uppercase display-3 fw-bolder'>New Season Arrival</h3>
          <p className='card-text lead fs-2'>Check Out All The Trends</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='card-img-overlay'>
        <img
          className="slideImg d-block w-100"
          src="/assets/slide-3.avif"
          alt="Second slide"
        />

        <Carousel.Caption>
        <h3 className='card-title text-uppercase display-3 fw-bolder'>New Season Arrival</h3>
          <p className='card-text lead fs-2'>Check Out All The Trends</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item className='card-img-overlay'>
        <img
          className="slideImg d-block w-100"
          src="/assets/slide-2.avif"
          alt="Third slide"
        />

        <Carousel.Caption>
        <h3 className='card-title text-uppercase display-3 fw-bolder'>New Season Arrival</h3>
          <p className='card-text lead fs-2'>Check Out All The Trends</p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
    </div>
  )
}
