import React from "react";
import HomepageForm from "../../containers/HomepageForm";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";

const Homepage = () => {
  const { accessToken } = useSelector(({ userReducer }) => ({
    accessToken: userReducer.accessToken,
  }));
  // console.log(isAccessToken);
  return (
    <div>
      <div className="center">
        <HomepageForm />
      </div>
      {accessToken === null && <Redirect to="/login" />}
    </div>
  );
};

export default Homepage;
