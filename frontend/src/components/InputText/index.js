import "./InputText.scoped.scss";

const InputText = (props) => {
  return (
    <div>
      <input
        type="text"
        className={props.value ? "active" : ""}
        value={props.value}
        onChange={props.onChange}
      />
      <label className="placeholder">{props.placeholder || ""}</label>
    </div>
  );
};

export default InputText;
