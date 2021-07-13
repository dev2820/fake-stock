import "./inputEmail.scoped.scss";

const InputText = (props) => {
    return (
        <div className="form-input-email">
        <input
            type="email"
            className={
            (props.value ? "active" : "") + 
            (props.value.includes("@") ? " happyEmoji" : " sadEmoji")
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
