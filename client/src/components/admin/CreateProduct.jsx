import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useDispatch } from 'react-redux';
import { CreateProducts } from '../../store/productsSlice';


export default function CreateProduct() {

  const [productImag, setProductImage] = useState("")
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [brand, setBrand] = useState("")
  const [desc, setDesc] = useState("")
  const dispatch = useDispatch();


  const productImageUploader = (e) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      setProductImage(reader.result);
    }
  }

  const formHandler = (e) => {
    e.preventDefault();
    dispatch(CreateProducts({
      name: name,
      price: price,
      brand: brand,
      desc: desc,
      image: productImag
    }))
  }
console.log(productImag)
  return (
    <div className='product-form d-flex justify-content-between gap-3'>
      <Form className='bg-dark py-5 px-5 w-50 rounded text-white mb-5 shadow'
      onSubmit={formHandler}
      >
        <h2>Create Products</h2>
        <Form.Group className="my-3" controlId="formBasicImage">
        <Form.Control type="file" placeholder="Image"  accept='image/'
        onChange={productImageUploader}
        />
      </Form.Group>
      <Form.Select aria-label="Default select example"
      className='my-3'
      onChange={(e)=> setBrand(e.target.value)}
      required
      >
      <option> select Brand</option>
      <option value="iphone">iphone</option>
      <option value="samsung">Samsung</option>
      <option value="lab">Lab</option>
      <option value="tablet">Tablet</option>
      <option value="men's clothing">Men's clothing</option>
      <option value=" women's Clothing">Women's Clothing</option>
      {/* <option value="men's clothing">Men's clothing</option> */}
      <option value="other">Other</option>
    </Form.Select>
        {/* Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem distinctio perferendis hic vel accusamus, sunt nulla laborum vero dolor non cum et! Consequuntur quod dignissimos reiciendis necessitatibus laborum totam minima? */}
      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Control type="text" placeholder="Name"
        onChange={(e) => setName(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPrice">
        <Form.Control type="number" placeholder="Price"
        onChange={(e) => setPrice(e.target.value)}
        />
      </Form.Group>

      <Form.Group className="my-3" controlId="formBasicDesc">
        <Form.Control type="text" placeholder="Short Description"
        onChange={(e) => setDesc(e.target.value)}
        />
      </Form.Group>

      <Button variant="primary" type="submit">
        Submit
      </Button>
    </Form>
    <div className='image-preview border rounded shadow w-50 gap-5 d-flex justify-content-center align-items-center'>
      {productImag ? (
        <>
        <img src={productImag} alt='Product Image' />
        </> ): (
          <div className=' '>
            <div className='spinner-border text-primary ' role='status'>
              <span className='sr-only'>Loading...</span>
            </div>
          </div>
        )
      }
    </div>
    </div>
  )
}
