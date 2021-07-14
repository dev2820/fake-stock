import "./inputEmail.scoped.scss";
const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
const InputText = (props) => {
    return (
        <div className="form-input-email">
        <input
            type="email"
            className={
            (props.value ? "active" : "") + 
            (emailRegExp.test(props.value) ? " happyEmoji" : " sadEmoji")
            }
            value={props.value}
            onChange={props.onChange}
            // className={props.value.includes("@") ? "happyEmoji" : "sadEmoji"}
        />
        <label className="placeholder">{props.placeholder || ""}</label>
        </div>
    );
};

export default InputText;
