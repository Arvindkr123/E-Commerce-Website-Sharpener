import React, { useRef } from "react";
import styles from "./signin.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/authContext";
const SignIn = () => {
  const { signIn } = useAuthValue();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      email: emailRef.current.value,
      password: passwordRef.current.value,
    };

    const status = await signIn(data);
    {
      status ? navigate("/") : navigate("/signIn");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.inputForm}>
        <h1>SignIn</h1>
        <form onSubmit={handleSubmit}>
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
          <button>SignIn</button>
        </form>
        <br />
        <span>or &nbsp;</span>
        <NavLink to={"/signUp"}>Create a new account</NavLink>
      </div>
    </div>
  );
};

export default SignIn;
