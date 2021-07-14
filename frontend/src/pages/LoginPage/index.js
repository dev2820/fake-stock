import "./loginPage.css";
import React from "react";
import LoginForm from "../../containers/LoginForm";
import { fetchAccessTokenActionCreator } from "../../modules/userReducer";
import Wave from "../../components/Wave";

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <Wave />
        <div className="center">
          <LoginForm />
        </div>
        {!props.accessToken && <Redirect to="/" />}
      </div>
    );
  }
}

export default connect(
  ({ userReducer }) => ({
      accessToken: userReducer.accessToken,
  }),
  {
      fetchAccessTokenActionCreator,
  }
)(LoginPage);
