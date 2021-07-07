import React from 'react';
import './inputPassword.css';
import visibleIcon from '../../assets/images/visible-icon.png'
import invisibleIcon from '../../assets/images/invisible-icon.png'
class InputPassword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            inputType : "password"
        }
        this.handleShowPassword = this.handleShowPassword.bind(this);
    }
    handleShowPassword = (e) => {
        if(this.state.inputType==="text") {
            this.setState({ inputType : "password"});
        }
        else {
            this.setState({ inputType : "text"});
        }
    }
    render() {
        return (
            <div className="form-input-password">
                <input 
                    type={this.state.inputType}
                    value={this.props.value}
                    onChange={this.props.onChange}
                    className={this.props.value ? "active" : ""}
                ></input>
                <label className="placeholder">{this.props.placeholder || ''}</label>
                {this.props.value && 
                    <img
                        className="show-password-icon"
                        src={this.state.inputType==="password" ? visibleIcon : invisibleIcon} 
                        onClick={this.handleShowPassword} 
                        alt="show password"
                    ></img>
                }
            </div>
        )
    }
}

export default InputPassword;