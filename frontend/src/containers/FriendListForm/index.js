import React, { useState, useCallback } from "react";
import { useDispatch,useSelector } from "react-redux";
import { fetchFriendsInfoActionCreator } from '../../modules/users'

import './FriendListForm.css'
import MyProfile from '../../components/SimpleMyProfile'
import FriendProfile from '../../components/SimpleFriendProfile'
import axios from "axios";

const FriendListForm = () => {
    const { userInfo,friends } = useSelector(({ userReducer }) => {
        return {
            userInfo: userReducer.userInfo,
            friends: userReducer.friendsInfo
        }
    });
    const dispatch = useDispatch();

    const test = async () => {
        const res = await axios.get('http://localhost:3000/user/testJWT');
        console.log(res);
    }
    return (
        <div>
            <MyProfile profile={userInfo}/>
            <hr/>
            <div>
                친구 수 {friends.length}
                {friends.map((friend,index)=>{
                <FriendProfile friend={friend} key={index}/>
                })}
            </div>
            <button onClick={test}>test</button>
        </div>
    )
}

export default FriendListForm;