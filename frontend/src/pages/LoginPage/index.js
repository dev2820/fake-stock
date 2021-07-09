import "./loginPage.css";
import React from "react";
import LoginForm from "../../containers/LoginForm";
import Wave from "../../components/Wave";

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <Wave />
        <div className="center">
          <LoginForm />
        </div>
      </div>
    );
  }
}

export default LoginPage;
