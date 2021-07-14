import React from "react";
import FindPassForm from "../../containers/FindPassForm";
import Wave from "../../components/Wave";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { fetchAccessTokenActionCreator } from "../../modules/userReducer";

class FindPassPage extends React.Component {
  render() {
    return (
      <div>
        <Wave />
        <div className="center">
          <FindPassForm />
        </div>
        {!this.props.accessToken && <Redirect to="/" />}
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
)(FindPassPage);
