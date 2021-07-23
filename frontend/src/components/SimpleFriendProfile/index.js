import "./SimpleFriendProfile.css";
// import FriendProfileWidget from "../../containers/FriendProfileWidget";
const SimpleFriendProfile = ({ profile }) => {
  return (
    // <FriendProfileWidget />
    <div>
      <img className="profile-image" src={profile && profile.img} />
      <span className="status-message">{profile && profile.statusMessage}</span>
      <span className="name">{profile && profile.name}</span>
    </div>
  );
};

export default SimpleFriendProfile;
