import React, { useState, useCallback } from "react";
import "./FriendListPage.scoped.scss";
import FriendListForm from '../../containers/FriendListForm'

import { useDispatch,useSelector } from "react-redux";
import { Redirect } from "react-router";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faComment,faSearch,faUserPlus } from "@fortawesome/free-solid-svg-icons";
const FriendListPage = () => {
  const { isAccessToken } = useSelector(({ userReducer }) => ({
    isAccessToken: !!userReducer.accessToken,
  }));
  const logout = () => {
    //로그아웃 리퀘스트 만드세요
  }
  return (
    <div id="friendsListPage">
      <aside className="routes">
        <Link to="/friend">
          <FontAwesomeIcon icon={faUser} />
        </Link>
        <Link to="/chats">
          <FontAwesomeIcon icon={faComment} />
        </Link>
        <button onClick={logout}>로그아웃</button>
      </aside>
      <main>
        <header>
          <span className="title">친구</span>
          <span className="menu">
            <FontAwesomeIcon icon={faSearch} />
            <FontAwesomeIcon icon={faUserPlus} />
          </span>
        </header>
        <FriendListForm/>
      </main>
      {!isAccessToken && <Redirect to="/login" />}
    </div>
  );
};

export default FriendListPage