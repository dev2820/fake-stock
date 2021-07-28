import "./SimpleMyProfile.css";
import defaultProfile from '../../assets/images/default_profile_img.jpg'
const SimpleMyProfile = ({ profile,onClick }) => {
  return (
    <div className="simple-my-profile">
      <img className="profile-image" src={(profile && profile.img) || defaultProfile} 
            onClick={onClick}
      />
      <div className="profile-info">
        <span className="name">{profile && profile.name}</span>
        {profile.statusMessage && <span className="status-message">{profile.statusMessage}</span>}
      </div>
    </div>
  );
};

export default SimpleMyProfile;
