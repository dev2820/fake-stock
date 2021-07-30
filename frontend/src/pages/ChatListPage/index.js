import React from "react";
import "./ChatListPage.css";
import AsideMenuForm from "../../containers/AsideMenuForm";
import { useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faComment } from "@fortawesome/free-solid-svg-icons";
const ChatListPage = () => {
  const { accessToken } = useSelector(({ userReducer }) => ({
    accessToken: userReducer.accessToken,
  }));
  return (
    <React.Fragment>
      <aside>
        <AsideMenuForm />
      </aside>
      <main>
        <header>채팅</header>
      </main>
      {accessToken === null && <Redirect to="/login" />}
    </React.Fragment>
  );
};

export default ChatListPage;
