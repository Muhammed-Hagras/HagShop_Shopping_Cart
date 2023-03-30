import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { registerUser } from "../../../store/authSlice";
import { StyledForm } from "./StyledForm";

const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const authReducer = useSelector((state) => state.authReducer);
console.log({authReducer})
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  // useEffect(() => {
  //   if (authReducer._id) {
  //     navigate("/cart");
  //   }
  // }, [authReducer._id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(user);
    dispatch(registerUser(user));
  };

  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h2>Register</h2>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setUser({ ...user, name: e.target.value })}
        />
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setUser({ ...user, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setUser({ ...user, password: e.target.value })}
        />
        <button>
          {authReducer.rigisterStatus === "pending" ? "Submitting..." : "Register"}
        </button>
        {authReducer.registerStatus === "rejected" ? (
          <p>{authReducer.registerError}</p>
        ) : null}
      </StyledForm>
    </>
  );
};

export default Register;
