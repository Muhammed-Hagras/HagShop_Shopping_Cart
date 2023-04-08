import React from 'react'
import "./Contact.scss"
import { motion } from "framer-motion";

import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import GoogleIcon from '@mui/icons-material/Google';
import PinterestIcon from '@mui/icons-material/Pinterest';

export default function Contact() {
  return (
    <div className='contact-page'>
      <div className='contact '>
        <div className="wrapper">
            <motion.span className='text-uppercase'
               initial={{ y: -150 }}
               animate={{
                 y: 0,
               }}
               transition={{
                 type: "spring",
                 stiffness: 260,
                 damping: 20,
                 duration:7
               }}
            >Be in Touch With us</motion.span>
            <motion.div className="mail"
            initial={{ y: 150 }}
            animate={{
              y: 0,
            }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              duration:7
            }}
            >
                <input type="text" name="" placeholder='Enter your e-mail' id="" />
                <button className='text-uppercase'>Join us</button>
            </motion.div>
            <div className="icons">
                <FacebookIcon/>
                <InstagramIcon/>
                <TwitterIcon/>
                <GoogleIcon/>
                <PinterestIcon/>
            </div>
        </div>
    </div>
    </div>
  )
}
