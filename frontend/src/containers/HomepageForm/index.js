import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <div>
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
