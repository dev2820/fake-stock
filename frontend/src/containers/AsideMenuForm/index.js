import './AsideMenuForm.scss'
import React, { useState, useCallback } from "react";
import { NavLink } from "react-router-dom";
import { faUser,faComment,faSearch,faUserPlus,faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
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
        <div className="route-menus">
            <div className="main-menu">
                <NavLink exact to="/" title="친구" activeStyle={activeStyle}>
                    <FontAwesomeIcon className="fa-lg" icon={faUser}/>
                </NavLink>
                <NavLink to="/chats" title="채팅" activeStyle={activeStyle}>
                    <FontAwesomeIcon className="fa-lg" icon={faComment} />
                </NavLink>
            </div>
            <div className="sub-menu">
                <a href="#" title="로그아웃" onClick={logout}>
                    <FontAwesomeIcon className="fa-lg" icon={faSignOutAlt} />
                </a>
            </div>
        </div>
    )
}

export default AsideMenuForm;