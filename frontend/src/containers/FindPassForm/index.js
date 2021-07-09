import React from "react";
import "./findPassForm.css";
import { Link } from "react-router-dom";
import InputText from "../../components/InputText";
import Button from "../../components/Button";
import CardUI from "../../components/CardUI";
import axios from "axios";

class FindPassForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      codeKey: "",
      guideText: "등록한 이메일을 입력해주세요.",
    };
    this.gotoConfirmCodeKeyStep = this.gotoConfirmCodeKeyStep.bind(this);
    this.gotoChangePassStep = this.gotoChangePassStep.bind(this);
    this.requestChangePassword = this.requestChangePassword.bind(this);

    this.getEmailStep = React.createRef();
    this.confirmCodeKeyStep = React.createRef();
    this.changePassStep = React.createRef();
  }
  render() {
    return (
      <CardUI>
        <div className="links">
          <Link className="link" to="/">
            Home
          </Link>
        </div>
        <div className="form" ref={this.getEmailStep}>
          <h2 className="title">FindPass</h2>
          <p>{this.state.guideText}</p>
          <InputText
            placeholder="User Email"
            value={this.state.email}
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          ></InputText>
          <hr />
          <Button onClick={this.gotoConfirmCodeKeyStep}>인증코드 보내기</Button>
        </div>
        <div className="form hidden" ref={this.confirmCodeKeyStep}>
          <h2 className="title">FindPass</h2>
          <p>{this.state.guideText}</p>
          <InputText
            placeholder="codekey"
            value={this.state.codeKey}
            onChange={(e) => {
              this.setState({ codeKey: e.target.value });
            }}
          ></InputText>
          <Button onClick={this.gotoChangePassStep}>확인</Button>
        </div>
        <div className="form hidden" ref={this.changePassStep}>
          <h2 className="title">FindPass</h2>
          <p>{this.state.guideText}</p>
          <InputText
            placeholder="codekey"
            value={this.state.codeKey}
            onChange={(e) => {
              this.setState({ codeKey: e.target.value });
            }}
          ></InputText>
          <Button onClick={this.requestChangePassword}>확인</Button>
        </div>
      </CardUI>
    );
  }
  gotoConfirmCodeKeyStep() {
    axios
      .get("/user/sendConfirmCode", {
        params: {
          email: this.state.email,
        },
      })
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          this.getEmailStep.current.classList.add("hidden");
          this.confirmCodeKeyStep.current.classList.remove("hidden");
        } else {
          this.setState({
            guideText: "이메일을 확인 후 재시도 해주십시오",
          });
        }
      });
  }
  gotoChangePassStep() {
    axios
      .post("/user/checkConfirmCode", {
        codeKey: this.state.email,
      })
      .then((response) => {
        if (response.status === 200) {
          this.getEmailStep.current.classList.add("hidden");
          this.confirmCodeKeyStep.current.classList.remove("hidden");
          this.setState({
            guideText: "이메일로 전송된 확인 코드를 입력해주세요",
          });
        } else {
          this.setState({
            guideText: "코드가 일치하지 않습니다.",
          });
        }
      });
  }
  requestChangePassword() {}
}

export default FindPassForm;
