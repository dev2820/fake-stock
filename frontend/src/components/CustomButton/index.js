import './CustomButton.scss';

const Button = (props) => {
    let className="custom-button"
    if(props.className) {
        className += ` ${props.className}`;
    }
    return (
        <button className={className} onClick={props.onClick}>
            {props.children}
        </button>
    )
}

export default Button;