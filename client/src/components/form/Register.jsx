import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from 'react-bootstrap/Alert';
import { registerUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom"

export default function Register() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {_id, registerError, registerStatus } = useSelector(state => state.authReducer);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    if (_id) {
      navigate("/cart");
    }
  }, [_id, navigate]);

  const submitHandler = (e) => {
    e.preventDefault();
    dispatch(registerUser(user));

  };
  return (
    <div className="container p-5 m-auto w-50 text-center">
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Password</Form.Label>
          <Form.Control type="text" placeholder="Name" 
          onChange={(e)=>setUser({...user, name : e.target.value})}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control type="email" placeholder="Enter email"
          onChange={(e)=>setUser({...user, email : e.target.value})}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control type="password" placeholder="password" 
          
         onChange={(e)=>setUser({...user, password : e.target.value})}
          />
        </Form.Group>

        
        <Button variant="success" type="submit"
        className="mb-3"
        >
        {registerStatus === "pending" ? "Submitting..." : "Register"}
        </Button>
        {registerStatus === "rejected" ? (
          <Alert variant="danger">
            {registerError}
        </Alert>
        
        ) : null}

        
      </Form>
    </div>
  );
}
