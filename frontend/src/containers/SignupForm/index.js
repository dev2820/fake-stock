import './signupForm.css'
import React from 'react';
import { connect } from 'react-redux';
import { fetchIsLoginedActionCreator } from '../../modules/userReducer'
import { Link } from 'react-router-dom';
import CardUI from '../../components/CardUI';
import InputText from '../../components/InputText';
import InputPassword from '../../components/InputPassword';
import Button from '../../components/CustomButton';
class SignupForm extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            inputText : "",
            email: "",
            password: ""
        };
        this.handleSignup = this.handleSignup.bind(this);
    }
    render() {
        return (
            <CardUI>
                <div className="form">
                    <h2 className="title">SIGN UP</h2>
                    <InputText 
                        className="email-field"
                        placeholder="User Email"
                        value={this.state.email}
                        onChange={(e)=>{this.setState({email:e.target.value})}}
                    />
                    <InputPassword 
                        className="password-field" 
                        placeholder="Password"
                        value={this.state.password}
                        onChange={(e)=>{this.setState({password:e.target.value})}}
                    />
                    <div className="links">
                        <span>
                        go back to <Link className="link" to="/signin"> Sign in</Link>
                        </span>
                    </div>
                    <Button onClick={this.handleSignup}>SIGN UP</Button>
                </div>
            </CardUI>
        )
    }
    handleSignup(event) {
        
    }
}

/*redux 연결 */
export default connect(
  ({ userReducer }) => ({
    isLogined: userReducer.isLogined,
  }),
  {
    fetchIsLoginedActionCreator,
  }
)(SignupForm);

// export default connect((state) => ({
//     test: state.signinReducer
// }), {
//     fetchTestActionCreator
// })(SigninForm);
