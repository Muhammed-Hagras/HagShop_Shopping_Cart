import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Alert from 'react-bootstrap/Alert';
import { loginUser } from "../../store/authSlice";
import { useNavigate } from "react-router-dom"

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {_id, loginError, loginStatus } = useSelector(state => state.authReducer);
  const [user, setUser] = useState({
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
    dispatch(loginUser(user));

  };
  return (
    <div className="container p-5 m-auto w-50 text-center">
      <Form onSubmit={submitHandler}>
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
        className="mb-3 px-5 fs-5"
        >
        {loginStatus === "pending" ? "Submitting..." : "Loin"}
        </Button>
        {loginStatus === "rejected" ? (
          <Alert variant="danger">
            {loginError}
        </Alert>
        
        ) : null}

        
      </Form>
    </div>
  );
}
