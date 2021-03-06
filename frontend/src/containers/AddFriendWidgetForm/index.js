import "../../containers/AddFriendWidgetForm/AddFriendWidget.scss";
import React, { useState, useCallback } from "react";
import ModalCard from "../../components/ModalCard";
import InputSearch from "../../components/InputSearch";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { requestUserInfo } from "../../api/users";

const AddFriendWidgetForm = (props) => {
  const { open, close } = props;

  const [email, setEmail] = useState("");
  // const [show, setShow] = useState(false);
  const [length, setLength] = useState(0);
  const dispatch = useDispatch();
  // console.log(open);
  // const openModal = () => {
  //   setShow(true);
  // };
  // const closeModal = () => {
  //   setShow(false);
  // };

  const onChangeEmail = useCallback((e) => {
    setEmail(e.target.value);
  }, []);

  const onClick = useCallback(() => {
    dispatch(requestUserInfo({ email }));
  }, [dispatch, email]);
  const onEnter = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };

  const onCount = (e) => {
    setLength(e.target.value.length);
    // console.log(length);
  };
  let emailLength = `${length}/20`;

  return (
    <React.Fragment>
      {/* <button onClick={openModal} className="addFriendButton">
        <FontAwesomeIcon icon={faUserPlus} />
      </button> */}
      <ModalCard
        open={open}
        // open={show}
        close={close}
        // type="addFriendForm"
        header="친구 추가"
        main={
          <div className="content">
            <InputSearch
              placeholder="친구 ID"
              value={email}
              onChange={onChangeEmail}
              onKeyPress={onEnter}
              onKeyUp={onCount}
            />
            <span className="emailLength"> {emailLength}</span>
          </div>
        }
        footer={
          <div className="addButton">
            <button
              className={email ? "activeButton" : "non-activeButton"}
              onClick={onClick}
            >
              친구 추가
            </button>
          </div>
        }
      />
    </React.Fragment>
  );
};

export default AddFriendWidgetForm;
