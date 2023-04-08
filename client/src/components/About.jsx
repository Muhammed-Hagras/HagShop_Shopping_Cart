import React from 'react'
import { useSelector } from 'react-redux'
import { motion } from "framer-motion";

export default function About() {
    const state = useSelector((state)=> state.cartReducer)
    console.log(state)
  return (
    <div className="py-5 service-14">
    <div className="container">
        <motion.h2 className='text-center mb-5'
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
        >About Us</motion.h2>
        <div className="row py-5">
            <motion.div className="col-lg-4"
            initial={{ x: -150 }}
            animate={{
              x: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration:7
            }}
            >
								<span className="badge badge-info rounded-pill px-3 py-1 font-weight-light">Service 14</span>
                <h3 className="my-3">Awesome with Extra Ordinary Flexibility</h3>
                <p>You can relay on our amazing features list and also our customer services will be great experience for our users</p>
                <p>You will surely fall in love with ready touse bootstrap ui kit framework.</p>
            </motion.div>
            <motion.div className="col-lg-4"
            initial={{ x: 150 }}
            animate={{
              x: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration:7
            }}
            >
                <div className="mb-4 mb-sm-0">
                    <img className="rounded img-fluid"
                     height="400px"
                     width="400px"
                      src="https://fakestoreapi.com/img/51Y5NI-I5jL._AC_UX679_.jpg" alt="wrappixel kit" />
                    <div className="mt-3">
                        <h6 className="fw-bold">BIYLACLESEN</h6>
                        <p className="mt-3">You can relay on our amazing features list and also our customer services will be great experience.</p>

                    </div>
                </div>
            </motion.div>
            <motion.div className="col-lg-4"
            initial={{ x: 150 }}
            animate={{
              x: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration:7
            }}
            >
                <div className="mb-4 mb-sm-0">
                    <img className="rounded img-fluid"  height="400px"
            width="400px" 
             src="https://fakestoreapi.com/img/71-3HjGNDUL._AC_SY879._SX._UX._SY._UY_.jpg" alt="wrappixel kit" />
                    <div className="mt-3">
                        <h6 className="fw-bold">Mens Casual</h6>
                        <p className="mt-3">You can relay on our amazing features list and also our customer services will be great experience.</p>

                    </div>
                </div>
            </motion.div>
        </div>
    </div>
</div>
  )
}
