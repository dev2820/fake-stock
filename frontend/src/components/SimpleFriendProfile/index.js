import "./SimpleFriendProfile.css";
// import FriendProfileWidget from "../../containers/FriendProfileWidget";

import defaultProfile from '../../assets/images/default_profile_img.jpg'
const SimpleFriendProfile = ({ profile }) => {
  return (
    // <FriendProfileWidget />
    <div className="simple-friend-profile">
      <img className="profile-image" src={(profile && profile.img) || defaultProfile} />
      <div className="profile-info">
        <span className="name">{profile && profile.name}</span>
        {(profile && profile.statusMessage) && <span className="status-message">{profile.statusMessage}</span>}
      </div>
    </div>
  );
};

export default SimpleFriendProfile;
