import React from "react";
import "../../components/ModalCard/ModalCard.scss";

const ModalCard = (props) => {
  const { open, close, header, main, footer } = props;

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <div className="modalCard">
          <header className="modalHeader">
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main className="modalMain">{main}</main>
          <footer className="modalFooter">{footer}</footer>
        </div>
      ) : null}
    </div>
  );
};

export default ModalCard;
