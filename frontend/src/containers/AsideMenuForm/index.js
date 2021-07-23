import './AsideMenuForm.scss'
import React, { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { faUser,faComment,faSearch,faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { useDispatch,useSelector } from "react-redux";
import { requestLogout } from '../../modules/users'

const AsideMenuForm  = () => {
    const dispatch = useDispatch();
    const activeStyle= {
        color:'#333333',
    }
    const logout = () => {
      //로그아웃 => refresh 토큰 삭제
      dispatch(
        requestLogout()
      );
    } 
    return (
        <aside className="routes">
            <NavLink exact to="/" activeStyle={activeStyle}>
                <FontAwesomeIcon icon={faUser} />
            </NavLink>
            <NavLink to="/chats" activeStyle={activeStyle}>
                <FontAwesomeIcon icon={faComment} />
            </NavLink>
            <button onClick={logout}>로그아웃</button>
        </aside>
    )
}

export default AsideMenuForm;