import "./signupForm.css";
import React from "react";
import { connect } from "react-redux";
import { fetchIsLoginedActionCreator } from "../../modules/userReducer";
import { Link,Redirect } from "react-router-dom";
import CardUI from "../../components/CardUI";
import InputEmail from "../../components/InputEmail";
import InputPassword from "../../components/InputPassword";
import Button from "../../components/CustomButton";
import axios from 'axios';
const emailRegExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      email: "",
      password: "",
    };
    this.requestSignup = this.requestSignup.bind(this);
  }
  render() {
    return (
      <CardUI className="signup-from">
        <div className="form">
          <h2 className="title">SIGN UP</h2>
          <InputEmail
            className="email-field"
            placeholder="User Email"
            value={this.state.email}
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          />

          <hr />
          <InputPassword
            className="password-field"
            placeholder="Password"
            value={this.state.password}
            onChange={(e) => {
              this.setState({ password: e.target.value });
            }}
          />
          <div className="links">
            <span>
              go back to{" "}
              <Link className="link" to="/login">
                {" "}
                Log in
              </Link>
            </span>
          </div>
          <Button onClick={this.requestSignup}>SIGN UP</Button>
        </div>
        { this.props.isLogined && <Redirect to="/"/>}
      </CardUI>
    );
  }
  requestSignup(event) {
    if(!this.state.email) {
      alert('이메일을 입력해 주십시오.')
      return;
    }
    if(!emailRegExp.test(this.state.email)) {
      alert('이메일 형식이 일치하지 않습니다.')
      return;
    }
    if(!this.state.password) {
      alert('비밀번호를 입력해 주십시오.');
      return;
    }
    axios.post('http://localhost:3000/user/createUser',{
      email: this.state.email,
      pw: this.state.password
    }).then((response)=>{
      if(response.status === 200) {
        this.props.fetchIsLoginedActionCreator({ isLogined: true });
      }
    });
    
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
