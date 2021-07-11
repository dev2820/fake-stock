import "./signupForm.css";
import React from "react";
import { connect } from "react-redux";
import { fetchIsLoginedActionCreator } from "../../modules/userReducer";
import { Link } from "react-router-dom";
import CardUI from "../../components/CardUI";
import InputText from "../../components/InputText";
import InputPassword from "../../components/InputPassword";
import Button from "../../components/CustomButton";
class SignupForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      inputText: "",
      email: "",
      password: "",
    };
    this.handleExchangeTest = this.handleExchangeTest.bind(this);
  }
  render() {
    return (
      <CardUI>
        <div className="links">
          <Link className="link" to="/">
            Home
          </Link>
        </div>
        <div className="form">
          <h2 className="title">SIGN UP</h2>
          {/* <h2>{this.props.test}</h2> */}
          <InputText
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
          {/* <input type="text" onChange={(e)=>{this.setState({inputText:e.target.value})}}></input> */}
          {/* <button onClick={this.handleExchangeTest}>변경</button> */}
          <div className="links">
            <span>
              go back to{" "}
              <Link className="link" to="/login">
                {" "}
                Log in
              </Link>
            </span>
          </div>
          <Button onClick={this.handleExchangeTest}>SIGN UP</Button>
        </div>
      </CardUI>
    );
  }
  handleExchangeTest(event) {
    this.props.fetchTestActionCreator({ text: this.state.inputText });
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
