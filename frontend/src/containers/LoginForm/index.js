import React, { useState, useCallback } from "react";
import CardUI from "../../components/CardUI";
import Button from "../../components/CustomButton";
import { Link } from "react-router-dom";
import InputText from "../../components/InputText";
import InputPassword from "../../components/InputPassword";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);
  const onChangePassword = useCallback((e) => {
    setPassword(e.target.value);
  }, []);

  return (
    <CardUI>
      <div className="links">
        <Link className="link" to="/">
          Home
        </Link>
      </div>
      <div className="form">
        <h2 className="title">LOG IN</h2>
        <InputText
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
        <Button>LOG IN</Button>
      </div>
    </CardUI>
  );
};

export default LoginForm;
