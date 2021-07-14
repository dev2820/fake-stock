import React from "react";
import HomepageForm from "../../containers/HomepageForm";
import Wave from "../../components/Wave";
import { fetchAccessTokenActionCreator } from "../../modules/userReducer";

const Homepage = () => {
  return (
    <div>
      <Wave />
      <div className="center">
        <HomepageForm />
      </div>
      {!!props.accessToken && <Redirect to="/login" />}
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
