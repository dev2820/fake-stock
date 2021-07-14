import React, { useState, useCallback } from "react";
import CardUI from "../../components/CardUI";
import Button from "../../components/CustomButton";
import { Link, Redirect } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchIsLoginedActionCreator } from "../../modules/userReducer";

import InputEmail from "../../components/InputEmail";
import InputPassword from "../../components/InputPassword";
import axios from "axios";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { isLogin } = useSelector(({ userReducer }) => ({
    isLogin: userReducer.isLogined,
  }));
  const dispatch = useDispatch();

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  const onClick = useCallback(() => {
    dispatch(fetchIsLoginedActionCreator({ isLogined: true }));

    axios
      .post("http://localhost:3000/user/login", {
        email: email,
        pw: password,
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // console.log("confirmed");
          dispatch(fetchIsLoginedActionCreator({ isLogined: true }));
        } else console.log("login error");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email, password, dispatch]);

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
