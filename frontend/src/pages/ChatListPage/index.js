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
    <div id="homePage">
      <AsideMenuForm/>
      <main>
        <header>채팅</header>
      </main>
      {accessToken === null && <Redirect to="/login" />}
    </div>
  );
};

export default ChatListPage;
