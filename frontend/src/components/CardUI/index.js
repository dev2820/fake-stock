import './CardUI.css'
const CardUI = (props) => { 
    return (
        <div className="card">
            {props.children}
        </div>
    )
};
export default CardUI;