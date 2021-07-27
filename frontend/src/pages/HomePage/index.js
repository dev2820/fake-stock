import React from "react";
import './homePage.css'

import HomepageForm from "../../containers/HomepageForm";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faComment } from "@fortawesome/free-solid-svg-icons";
const Homepage = () => {
  const { accessToken } = useSelector(({ userReducer }) => ({
    accessToken: userReducer.accessToken,
  }));
  return (
    <React.Fragment>
      <aside class="menu">
        <Link to="/friend">
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link to="/chats">
          <FontAwesomeIcon icon={faComment} />
        </Link>
      </aside>
      <main>
        <header>head</header>
        <HomepageForm />
      </main>
      {accessToken === null && <Redirect to="/login" />}
    </React.Fragment>
  );
};

export default Homepage;
