import React from "react";
import { useSelector } from "react-redux";
import { Link, Redirect } from "react-router-dom";
// import userReducer from "../../modules/userReducer";

const HomePage = () => {
  const { isLogin } = useSelector(({ userReducer }) => ({
    isLogin: userReducer.isLogined,
  }));
  return (
    <div>
      {isLogin || <Redirect to="/login" />}
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
