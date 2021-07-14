import "./loginPage.css";
import React from "react";
import LoginForm from "../../containers/LoginForm";
import { fetchAccessTokenActionCreator } from "../../modules/userReducer";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import Wave from "../../components/Wave";

class LoginPage extends React.Component {
  render() {
    return (
      <div>
        <Wave />
        <div className="center">
          <LoginForm />
        </div>
        {this.props.accessToken !== null && <Redirect to="/" />}
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
