import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestUserInfo, requestFriendsInfo } from "../../modules/users";

import "./FriendListForm.css";
import SimpleMyProfile from "../../components/SimpleMyProfile";
import SimpleFriendProfile from "../../components/SimpleFriendProfile";
import MyprofileWidget from "../../containers/MyProfileWidget";
import FriendProfileWidget from "../../containers/FriendProfileWidget";

const FriendListForm = () => {
  const [showMyProfile, setShowMyProfile] = useState(false);
  const [showFirendProfile, setShowFriendProfile] = useState(false);
  // const [detailProfile, setDetailProfile] = useState({});
  const { isAccessToken, userInfo, friends, email } = useSelector(
    ({ userReducer }) => {
      return {
        isAccessToken: !!userReducer.accessToken,
        userInfo: userReducer.userInfo,
        friends: userReducer.friendsInfo || [],
        email: userReducer.email,
      };
    }
  );

  const closeModal = () => {
    setShowFriendProfile(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    if (isAccessToken) {
      dispatch(requestUserInfo(email));
      dispatch(requestFriendsInfo(email));
    }
    return () => {}; // unmount시 아무것도 안함
  }, [dispatch, email, isAccessToken]);

  return (
    <div>
      <React.Fragment>
        <SimpleMyProfile
          profile={userInfo || {}}
          onClick={() => setShowMyProfile(true)}
        />
        <MyprofileWidget
          open={showMyProfile}
          close={() => {
            setShowMyProfile(false);
          }}
        />
      </React.Fragment>
      <hr />
      <div>
        <h3>친구 수 {friends.length || -1}</h3>
        {friends.map((friend, index) => {
          return (
            <React.Fragment>
              <SimpleFriendProfile
                profile={friend}
                key={index}
                onClick={() => setShowFriendProfile(true)}
              />
              <FriendProfileWidget
                open={showFirendProfile}
                close={closeModal}
              />
            </React.Fragment>
          );
        })}
      </div>
      {/* <친구-자세한-프로필 show={ShowDetail} profile={profile} close={()=>setShowFriendProfile(false)}/> */}
    </div>
  );
};

export default FriendListForm;
