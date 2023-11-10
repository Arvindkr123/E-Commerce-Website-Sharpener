import React, { useRef } from "react";
import styles from "./SignUp.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/authContext";
const SignUp = () => {
  const nameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const { createUser } = useAuthValue();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: nameRef.current.value,
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };
    createUser(data);
    navigate("/signIn");
  };

  return (
    <>
      <div className={styles.container}>
        <div className={styles.inputForm}>
          <h1>SignUp</h1>
          <form onSubmit={handleSubmit}>
            <input
              ref={nameRef}
              type="text"
              placeholder="Enter Name..."
              required
            />
            <input
              ref={emailRef}
              type="email"
              placeholder="Enter Email..."
              required
            />
            <input
              ref={passwordRef}
              type="password"
              placeholder="Enter Password..."
              required
            />
            <button>SignUp</button>
          </form>
          <br />
          <span>or &nbsp;</span>
          <NavLink to={"/signIn"}>already have an account ?</NavLink>
        </div>
      </div>
    </>
  );
};

export default SignUp;
