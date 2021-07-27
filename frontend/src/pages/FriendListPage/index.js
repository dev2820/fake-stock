import React /*, { useEffect, useState } */ from "react";
import "./FriendListPage.scoped.scss";

import { Redirect } from "react-router";
import { NavLink } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUser,faComment,faSearch,faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { requestLogout } from '../../modules/users'
import { useDispatch, useSelector } from "react-redux";

import AddFriendWidgetForm from "../../containers/AddFriendWidgetForm";
import MyProfileWidget from "../../containers/MyProfileWidget";
import FriendProfileWidget from "../../containers/FriendProfileWidget";
import FriendListForm from '../../containers/FriendListForm'
import AsideMenuForm from "../../containers/AsideMenuForm";

const FriendListPage = () => {
  const dispatch = useDispatch();
  const { isAccessToken } = useSelector(({ userReducer }) => ({
    isAccessToken: !!userReducer.accessToken,
  }));
  // const [isSearchWidgetOn, setIsSearchWidgetOn] = useState(false);
  // const [isPlusFriendWidgetOn, setIsPlusFriendWidgetOn] = useState(false);
  return (
    <React.Fragment>
      <aside>
        <AsideMenuForm/>
      </aside>
      <main>
        <header>
          <span className="title">친구</span>
          <span className="menu">
            <button /*onClick={() => setIsSearchWidgetOn(true)}*/>
              <FontAwesomeIcon icon={faSearch} />
            </button>
            <AddFriendWidgetForm />
          </span>
        </header>
        <MyProfileWidget />
        <FriendListForm />
        <FriendProfileWidget />
        {/*<친구-검색-태그> */}
      </main>
      {!isAccessToken && <Redirect to="/login" />}
    </React.Fragment>
  );
};

export default FriendListPage;
