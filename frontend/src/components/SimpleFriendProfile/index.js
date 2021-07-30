import "./SimpleFriendProfile.css";

import defaultProfile from "../../assets/images/default_profile_img.jpg";
const SimpleFriendProfile = ({ profile, onClick }) => {
  return (
    <div className="simple-friend-profile">
      <img
        className="profile-image"
        src={(profile && profile.img) || defaultProfile}
        alt="simpleFriendProfile"
        onClick={onClick}
      />
      <div className="profile-info">
        <span className="name">{profile && profile.name}</span>
        {profile && profile.message && (
          <small className="status-message">{profile.message}</small>
        )}
      </div>
    </div>
  );
};

export default SimpleFriendProfile;
