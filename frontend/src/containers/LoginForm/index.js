import React, { useState, useCallback, useRef } from "react";
import CardUI from "../../components/CardUI";
import Button from "../../components/CustomButton";
import { Link, Redirect } from "react-router-dom";

import InputEmail from "../../components/InputEmail";
import InputPassword from "../../components/InputPassword";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLogin, setIsLogin] = useState(false);

  const userEmail = useRef("");
  const userPassword = useRef("");

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
    userEmail.current = e.target.value;
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
    userPassword.current = e.target.value;
  }, []);

  const onClick = useCallback(() => {
    console.log(isLogin);
    setIsLogin(true);
    // console.log(isLogin);

    axios
      .post("http://localhost:3000/user/login", {
        email: userEmail,
        pw: userPassword,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          console.log("confirmed");
          // setIsLogin(true);
        } else console.log("login error");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [isLogin]);

  return (
    <CardUI>
      <div className="form">
        <h2 className="title">LOG IN</h2>
        <InputEmail
          placeholder="User Email"
          value={email}
          onChange={onChangeEmail}
        />
        <hr />
        <InputPassword
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
        />
        <hr />

        <div className="links">
          <Link className="link" to="/signup">
            Sign Up
          </Link>
          <Link className="link" to="/findpass">
            Forgot password?
          </Link>
        </div>

        <Button onClick={onClick}>LOG IN</Button>
      </div>
      {isLogin && <Redirect to="/" />}
    </CardUI>
  );
};

export default LoginForm;
