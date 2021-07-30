import React, { useState, useCallback } from "react";
import "./loginForm.scoped.scss";
import CardUI from "../../components/CardUI";
import Button from "../../components/CustomButton";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { requestLogin /*refreshAccessToken*/ } from "../../modules/users";

import InputEmail from "../../components/InputEmail";
import InputPassword from "../../components/InputPassword";
import axios from "axios";
axios.defaults.withCredentials = true;

const LoginForm = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const onClick = useCallback(() => {
    dispatch(
      requestLogin({
        email,
        password,
      })
    );
  }, [email, password, dispatch]);
  
    return (
  <CardUI>
      <div className="form">
        <h2 className="title">LOG IN</h2>
        <InputEmail
          className="input"
          placeholder="User Email"
          value={email}
          onChange={onChangeEmail}
        />
        <InputPassword
          placeholder="Password"
          value={password}
          onChange={onChangePassword}
        />
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
    </CardUI>
  );
};

export default LoginForm;
