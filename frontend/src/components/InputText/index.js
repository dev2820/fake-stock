import './inputText.css';

const InputText = (props) => {
    return (
        <div className="form-input-text">
            <input 
                type="text" 
                className={props.value ? "active" : ""}
                value={props.value}
                onChange={props.onChange}
            ></input>
            <label className="placeholder">{props.placeholder || ''}</label>
        </div>
    )
}

export default InputText;