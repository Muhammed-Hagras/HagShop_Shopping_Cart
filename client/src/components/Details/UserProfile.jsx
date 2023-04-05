import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { baseURL, setHeaders } from "../../store/api";
import axios from "axios";
import styled from "styled-components";
import { Button, Form } from "react-bootstrap";
import { toast } from "react-toastify";


export default function UserProfile() {

  const { id } = useParams();
  const [user, setUser] = useState({
    name: "",
    email: "",
    isAdmin: false,
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);

  useEffect(() => {
    setLoading(true);
    async function fetchData() {
      try {
        const res = await axios.get(
          `${baseURL}/users/find/${id}`,
          setHeaders()
        );
        setUser({
          ...res.data,
          password: "",
        });
      } catch (error) {
        console.log(error);
      }
    }
    setLoading(false);
    fetchData();
  }, [id]);

  const formHandler = async(e) => {
    e.preventDefault();
    setUpdating(true);
    try {
      const res = await axios.put(`${baseURL}/users/${id}`, {
        ...user
      },
      setHeaders())

      setUser({...res.data, password: ""});
      toast.success("Profile updated successfully");

    } catch (error) {
      console.log(error)
    }
  } 

  return (
    <div>
      {loading ? (<>
        <div className='spinner-border text-primary m-auto align-self-center' role='status'>
            <span className='sr-only'>Loading...</span>
            </div>
      </>):(
        <div className="container p-5 m-auto w-50 text-left bg-light my-5 rounded shadow-lg text-dark fs-5">
        <h2 className="fw-bold">User Profile</h2>
        <div className= "user-role my-3">
            {user.isAdmin ? (
              <Admin className=" p-2 rounded  ">Admin</Admin>
            ) : (
              <Customer className="p-2 rounded  "
             
              >Customer</Customer>
            ) }
          </div>
      <Form className="w-50" onSubmit={formHandler}>
        <Form.Group className="mb-3 " controlId="formBasicName">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" placeholder="Name" 
          onChange={(e)=>setUser({...user, name : e.target.value})}
          className=" m-auto border-0"
          value={user.name}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"
          value={user.email}
          onChange={(e)=>setUser({...user, email : e.target.value})}
          className=" m-auto border-0"
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="password" 
          value={user.password}
         onChange={(e)=>setUser({...user, password : e.target.value})}
         className=" m-auto border-0 "
          />
        </Form.Group>

        
        <Button variant="info" type="submit"
        className="mb-3 mt-3 text-light"
        >
        {updating ? "Updateing" : "Update Profile"}
        </Button>
        

        
      </Form>
    </div>
      )}
    </div>
  )
}


const Admin = styled.div`
width: 80px;
color: rgb(255,193,7);
background-color: rgba(255,193,7, 0.05)
`;

const Customer = styled.div`
width: 110px;
color: rgb(13,202,240);
background-color: rgba(13,202,240,0.05)
`;
