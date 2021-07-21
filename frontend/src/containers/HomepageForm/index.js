import React from "react";
// import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
//import userReducer from "../../modules/userReducer";
// import axios from 'axios'
const HomePage = () => {
  return (
    <div>
      <div>
        <h1>친구 0</h1>
      </div>

      <div className="links">
        <Link className="link" to="/login">
          LOG IN
        </Link>

        <Link className="link" to="/signup">
          SIGN UP
        </Link>
      </div>
      {/* <button onClick={test}>test</button> */}
    </div>
  );
};

export default HomePage;
