import "./loginPage.css";
import React, { useState, useCallback } from "react";
import { useDispatch,useSelector } from "react-redux";

import LoginForm from "../../containers/LoginForm";
import { Redirect } from "react-router";

const LoginPage = () => {
    const { isAccessToken } = useSelector(({ userReducer }) => ({
      isAccessToken: !!userReducer.accessToken,
    }));
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
