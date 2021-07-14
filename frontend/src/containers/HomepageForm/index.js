import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import userReducer from "../../modules/userReducer";
import axios from 'axios'
const HomePage = () => {
  // const { isAccessToken } = useSelector(({ userReducer }) => ({
  //   isAccessToken: userReducer.accessToken,
  // }));
  const { accessToken } = useSelector(({ userReducer }) => ({
    accessToken: userReducer.accessToken,
  }));
  const test = () => {
    console.log(accessToken)
    axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
    axios.get('http://localhost:3000/user/testJWT').then(res=>{
      console.log(res);
    })
  }
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
      <button onClick={test}>test</button>
    </div>
  );
};

export default HomePage;
