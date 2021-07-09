import './Timer.css'

const Timer = (props) => {//props.time = 'second'
    if(props.time === 0) {
        props.onTimeOver();
    }
    return (
        <span className="timer">
        {props.time>0 ? 
            `${('0'+Math.floor(props.time/60)).slice(-2)}:${('0'+props.time%60).slice(-2)}` : ''
        }
        </span>
    )
}

export default Timer;