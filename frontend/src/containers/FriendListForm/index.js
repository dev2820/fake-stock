import React, { useState, useCallback,useEffect } from "react";
import { useDispatch,useSelector } from "react-redux";
import { requestUserInfo,requestFriendsInfo } from '../../modules/users'

import './FriendListForm.css'
import MyProfile from '../../components/SimpleMyProfile'
import FriendProfile from '../../components/SimpleFriendProfile'

const FriendListForm = () => {
    const [isShowDetail, setIsShowDetail] = useState(false);
    const [detailProfile, setDetailProfile] = useState({});
    const { userInfo,friends,email } = useSelector(({ userReducer }) => {
        return {
            email: userReducer.email,
            userInfo: userReducer.userInfo,
            friends: userReducer.friendsInfo
        }
    });
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(requestUserInfo(email));
        dispatch(requestFriendsInfo(email));
        return ()=>{}// unmount시 아무것도 안함
    },[]);
    return (
        <div>
            <MyProfile profile={userInfo}/>
            <hr/>
            <div>
                친구 수 {friends.length}
                {friends.map((friend,index)=>{
                <FriendProfile profile={friend} key={index} onClick={()=>{setDetailProfile(friend);setIsShowDetail(true);}}/>
                })}
            </div>
            {/* <친구-자세한-프로필 show={isShowDetail} profile={detailProfile} close={()=>setIsShowDetail(false)}/> */}
        </div>
    )
}

export default FriendListForm;