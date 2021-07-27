import "./signupPage.css";
import React /*useState, useCallback */ from "react";
import { /* useDispatch,*/ useSelector } from "react-redux";
import { Redirect } from "react-router";

import SignupForm from "../../containers/SignupForm";

const SignupPage = () => {
  const { isAccessToken } = useSelector(({ userReducer }) => ({
    isAccessToken: !!userReducer.accessToken,
  }));
  return (
    <React.Fragment>
      <div className="center">
        <SignupForm />
      </div>
      {isAccessToken && <Redirect to="/" />}
    </React.Fragment>
  );
};

/*redux 연결 */
export default SignupPage;
