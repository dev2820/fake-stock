import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestUserInfo, requestFriendsInfo } from "../../modules/users";

import "./FriendListForm.css";
import SimpleMyProfile from "../../components/SimpleMyProfile";
import SimpleFriendProfile from "../../components/SimpleFriendProfile";
// import FriendProfileWidget from "../../containers/FriendProfileWidget";

const FriendListForm = () => {
  const [isShowDetail, setIsShowDetail] = useState(false);
  const [detailProfile, setDetailProfile] = useState({});
  const { isAccessToken,userInfo, friends, email } = useSelector(({ userReducer }) => {
    return {
      isAccessToken: !!userReducer.accessToken,
      userInfo: userReducer.userInfo,
      friends: [],//userReducer.friendsInfo || [],
      email: userReducer.email,
    };
  });
  console.log(friends)
  const dispatch = useDispatch();
  useEffect(() => {
    if(isAccessToken){
      dispatch(requestUserInfo(email));
      dispatch(requestFriendsInfo(email));
    }
    return () => {}; // unmount시 아무것도 안함
  }, [dispatch]);
  return (
    <div>
      <SimpleMyProfile profile={userInfo || {}} />
      <hr/>
      <div>
        친구 수 {friends.length || -1}
        {friends && friends.map((friend, index) => {
          <SimpleFriendProfile
            profile={friend}
            key={index}
            onClick={() => {
              setDetailProfile(friend);
              setIsShowDetail(true);
            }}
          />;
        })}
      </div>
      <SimpleFriendProfile />
      {/* <친구-자세한-프로필 show={isShowDetail} profile={detailProfile} close={()=>setIsShowDetail(false)}/> */}
    </div>
  );
};

export default FriendListForm;
