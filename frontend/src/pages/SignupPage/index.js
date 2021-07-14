import "./signupPage.css";
import React from "react";
import SignupForm from "../../containers/SignupForm";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { fetchAccessTokenActionCreator } from "../../modules/userReducer";
import Wave from "../../components/Wave";
class SignupPage extends React.Component {
  render() {
    return (
      <div>
        <Wave />
        <div className="center">
          <SignupForm />
        </div>
        {!(this.props.accessToken === null) && <Redirect to="/" />}
      </div>
    );
  }
}
/*redux 연결 */
export default connect(
  ({ userReducer }) => ({
    accessToken: userReducer.accessToken,
  }),
  {
    fetchAccessTokenActionCreator,
  }
)(SignupPage);
