import "./signupForm.css";
import React, { useState, useCallback } from "react";
import { requestSignup } from "../../modules/users";
import { Link } from "react-router-dom";
import { useDispatch,useSelector } from "react-redux";

import CardUI from "../../components/CardUI";
import InputEmail from "../../components/InputEmail";
import InputPassword from "../../components/InputPassword";
import InputText from "../../components/InputText";
import Button from "../../components/CustomButton";
const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

const SignupForm = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const signup = useCallback(() => {
      if (!email) {
        alert("이메일을 입력해주십시오.");
        return;
      }
      if (!emailRegExp.test(email)) {
        alert("이메일 형식이 일치하지 않습니다.");
        return;
      }
      if (!password) {
        alert("비밀번호를 입력해주십시오.");
        return;
      }
  
      if (!name) {
        alert("이름을 입력해주십시오.");
        return;
      }
      dispatch(
        requestSignup({email,password,name})
      );
    }, [email, password,name, dispatch]);
    return (
      <CardUI className="signup-from">
        <div className="form">
          <h2 className="title">SIGN UP</h2>
          <InputEmail
            className="email-field"
            placeholder="User Email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
          <InputPassword
            className="password-field"
            placeholder="Password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
            }}
          />
          <InputText
            // className="password-field"
            placeholder="Name"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
            }}
          />
          <div className="links">
            <span>
              go back to{" "}
              <Link className="link" to="/login">
                {" "}
                Log in
              </Link>
            </span>
          </div>
          <Button onClick={signup}>SIGN UP</Button>
        </div>
      </CardUI>
    );
}

export default SignupForm;