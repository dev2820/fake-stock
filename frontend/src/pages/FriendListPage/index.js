import React, { useState, useCallback } from "react";
import "./FriendListPage.scoped.scss";
import FriendListForm from '../../containers/FriendListForm'
import AsideMenuForm from "../../containers/AsideMenuForm";

import { useDispatch,useSelector } from "react-redux";
import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faComment,faSearch,faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { requestLogout } from '../../modules/users'

const FriendListPage = () => {
  const dispatch = useDispatch();
  const { isAccessToken } = useSelector(({ userReducer }) => ({
    isAccessToken: !!userReducer.accessToken,
  }));
  const [isSearchWidgetOn, setIsSearchWidgetOn] = useState(false);
  const [isPlusFriendWidgetOn, setIsPlusFriendWidgetOn] = useState(false);
  return (
    <div id="friendsListPage">
      <AsideMenuForm/>
      <main>
        <header>
          <span className="title">친구</span>
          <span className="menu">
            <button onClick={()=>setIsSearchWidgetOn(true)}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <button onClick={()=>setIsSearchWidgetOn(true)}>
              <FontAwesomeIcon icon={faUserPlus} />
            </button>
          </span>
        </header>
        <FriendListForm/>
        {/* <친구-추가-태그 show={isPlusFriendWidgetOn} close={()=>setIsSearchWidgetOn(false)}>*/}
        {/*<친구-검색-태그> */}
      </main>
      {!isAccessToken && <Redirect to="/login" />}
    </div>
  );
};

export default FriendListPage