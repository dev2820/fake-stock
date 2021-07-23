import React, { useState } from "react";
import ModalCard from "../../components/ModalCard";
import "../../containers/MyProfileWidget/MyProfileWidget.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import SampleProfileImage from "../../assets/images/happy.png";
const FriendProfileWidget = () => {
  const [show, setShow] = useState(false);
  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };
  return (
    <React.Fragment>
      <button onClick={openModal}>친구 프로필</button>
      <ModalCard
        open={show}
        close={closeModal}
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
