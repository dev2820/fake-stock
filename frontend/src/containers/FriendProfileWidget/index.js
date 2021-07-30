import React from "react";
import ModalCard from "../../components/ModalCard";
// import "../../containers/MyProfileWidget/MyProfileWidget.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import SampleProfileImage from "../../assets/images/default_profile_img.jpg";
const FriendProfileWidget = (props) => {
  const { open, close } = props;

  return (
    <React.Fragment>
      {/* <button onClick={openModal}>친구 프로필</button> */}
      <ModalCard
        open={open}
        close={close}
        type="profile"
        main={
          <div className="profile">
            <div className="profileImageContainer">
              <img
                src={SampleProfileImage}
                alt="friendProfileImage"
                className="profileImage"
              />

              <div className="myName">Friend's name</div>
            </div>
          </div>
        }
        footer={
          <div className="buttonContainer">
            <button>
              <FontAwesomeIcon icon={faComment} size="4x" />
              1:1 채팅
            </button>
          </div>
        }
      />
    </React.Fragment>
  );
};

export default FriendProfileWidget;
