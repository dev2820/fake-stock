import "./loginPage.css";
import React, { useState, useCallback,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { Redirect } from "react-router";
import { requestRefreshToken } from '../../modules/users'
import LoginForm from "../../containers/LoginForm";
const LoginPage = () => {
    const { isAccessToken } = useSelector(({ userReducer }) => ({
      isAccessToken: !!userReducer.accessToken,
    }));
    const dispatch = useDispatch();
    useEffect(()=>{
      dispatch(
        requestRefreshToken()
      );
      return ()=>{};//unmount시 아무것도 안함
    },[])
    return (
      <div>
        <div className="center">
          <LoginForm />
        </div>
        {isAccessToken && <Redirect to="/" />}
      </div>
    );
}

export default LoginPage;
