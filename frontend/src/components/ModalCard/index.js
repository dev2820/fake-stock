import React from "react";
import "../../components/ModalCard/ModalCard.scss";

const ModalCard = (props) => {
  const { open, close, header, main, footer } = props;

  return (
    <div className={open ? "openModal modal" : "modal"}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            {/* <div className={type}> */}
            {main}
            {/* {props.children} */}
            {/* </div> */}
          </main>
          <footer>
            {/* <div className={type}>{footer}</div> */}
            {footer}
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default ModalCard;
