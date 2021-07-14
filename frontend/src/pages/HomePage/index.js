import React from "react";
import HomepageForm from "../../containers/HomepageForm";
import Wave from "../../components/Wave";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { connect } from "react-redux";
import { fetchAccessTokenActionCreator } from "../../modules/userReducer";

const Homepage = () => {
  const { isAccessToken } = useSelector(({ userReducer }) => ({
    isAccessToken: userReducer.accessToken,
  }));
  console.log(isAccessToken);
  return (
    <div>
      <Wave />
      <div className="center">
        <HomepageForm />
      </div>
      {isAccessToken === null && <Redirect to="/login" />}
    </div>
  );
};

export default connect(
  ({ userReducer }) => ({
    accessToken: userReducer.accessToken,
  }),
  {
    fetchAccessTokenActionCreator,
  }
)(Homepage);
