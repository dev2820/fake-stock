import React, { useState, useCallback } from "react";
import CardUI from "../../components/CardUI";
import Button from "../../components/CustomButton";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { fetchAccessTokenActionCreator } from "../../modules/userReducer";

import InputEmail from "../../components/InputEmail";
import InputPassword from "../../components/InputPassword";
import axios from "axios";
axios.defaults.withCredentials = true;

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // const { isAccessToken } = useSelector(({ userReducer }) => ({
  //   isAccessToken: userReducer.accessToken,
  // }));
  const dispatch = useDispatch();

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);
  const refreshToken = useCallback(() => {
    axios.post('http://localhost:3000/user/refreshToken').then(response=>{
      //reducer accessToken 갱신
      console.log(response.data)
      dispatch(fetchAccessTokenActionCreator({ accessToken: response.data.access }));
      axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
      setTimeout(()=>{
        refreshToken();
      },response.data.date*1000 - 1000*30);
    });
  },[dispatch]);
  const onClick = useCallback(() => {
    axios
      .post("http://localhost:3000/user/login", {
        email: email,
        pw: password,
      })
      .then((response) => {
        console.log(1,response);
        if (response.status === 200) {
          // console.log("confirmed");
          dispatch(fetchAccessTokenActionCreator({ accessToken: response.data.access }));
          axios.defaults.headers.common['Authorization'] = `Bearer ${response.data.access}`;
          setTimeout(()=>{
              refreshToken();
          },response.data.date*1000 - 1000*30);
        } else console.log("login error");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [email, password,refreshToken, dispatch]);


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
      {/* {isAccessToken && <Redirect to="/" />} */}
    </CardUI>
  );
};

export default LoginForm;
