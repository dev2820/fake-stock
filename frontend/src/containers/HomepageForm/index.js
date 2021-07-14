import React from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
// import userReducer from "../../modules/userReducer";

const HomePage = () => {
  // const { isAccessToken } = useSelector(({ userReducer }) => ({
  //   isAccessToken: userReducer.accessToken,
  // }));
  return (
    <div>
      {/* {isAccessToken || <Redirect to="/login" />} */}
      <div>
        <h1>Welcome to Fake-Stock!</h1>
      </div>

      <div className="links">
        <Link className="link" to="/login">
          LOG IN
        </Link>

        <Link className="link" to="/signup">
          SIGN UP
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
