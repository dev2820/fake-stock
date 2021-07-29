import React, { useState } from "react";
import ModalCard from "../../components/ModalCard";
import "../../containers/MyProfileWidget/MyProfileWidget.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserEdit, faComment } from "@fortawesome/free-solid-svg-icons";
import sampleProfileImage from "../../assets/images/our-picture.png";
const MyProfileWidget = (props) => {
  const [show, setShow] = useState(false);
  const openModal = () => {
    setShow(true);
  };
  const closeModal = () => {
    setShow(false);
  };
  return (
    <React.Fragment>
      <button onClick={openModal}>내 프로필</button>
      <ModalCard
        open={show}
        close={closeModal}
        main={
          <div className="profile">
            <div className="profileImageContainer">
              {/* <div> */}
              <img
                src={sampleProfileImage}
                alt="myProfileimage"
                className="profileImage"
              />
              {/* </div> */}
              <div className="myName">YDW</div>
            </div>
          </div>
        }
        footer={
          <div className="buttonContainer">
            <button>
              <FontAwesomeIcon icon={faUserEdit} size="4x" />
              프로필 수정
            </button>
            <button>
              <FontAwesomeIcon icon={faComment} size="4x" />
              나와의 채팅
            </button>
          </div>
        }
      />
    </React.Fragment>
  );
};

export default MyProfileWidget;
