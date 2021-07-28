import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestUserInfo, requestFriendsInfo } from "../../modules/users";

import "./FriendListForm.css";
import SimpleMyProfile from "../../components/SimpleMyProfile";
import SimpleFriendProfile from "../../components/SimpleFriendProfile";
// import FriendProfileWidget from "../../containers/FriendProfileWidget";

const FriendListForm = () => {
  const [showDetail, setShowDetail] = useState(false);
  const [detailProfile, setDetailProfile] = useState({});
  const { isAccessToken,userInfo, friends, email } = useSelector(({ userReducer }) => {
    return {
      isAccessToken: !!userReducer.accessToken,
      userInfo: userReducer.userInfo,
      friends: userReducer.friendsInfo || [],
      email: userReducer.email,
    };
  });
  const dispatch = useDispatch();
  useEffect(() => {
    if(isAccessToken){
      dispatch(requestUserInfo(email));
      dispatch(requestFriendsInfo(email));
    }
    return () => {}; // unmount시 아무것도 안함
  }, [dispatch]);
  
  console.log(friends)
  return (
    <div>
      <SimpleMyProfile 
        profile={userInfo || {}}
        onClick={()=>setShowDetail(true)}
      />
      <hr/>
      <div>
        <h3>
          친구 수 {friends.length || -1}
        </h3>
        {friends.map((friend, index) => {
          return (<SimpleFriendProfile
            profile={friend}
            key={index}
            onClick={()=>setShowDetail(true)}
          />);
        })}
      </div>
      {/* <SimpleFriendProfile /> */}
      {/* <친구-자세한-프로필 show={ShowDetail} profile={profile} close={()=>setShowDetail(false)}/> */}
    </div>
  );
};

export default FriendListForm;
