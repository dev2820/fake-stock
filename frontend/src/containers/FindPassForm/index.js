import React from "react";
import "./FindPassForm.scss";
import InputEmail from "../../components/InputEmail";
import InputPassword from "../../components/InputPassword";
import Button from "../../components/CustomButton";
import CardUI from "../../components/CardUI";
import Timer from "../../components/Timer";
import { Link } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";
axios.defaults.withCredentials = true;
class FindPassForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      codeKey: "",
      newPassword: "",
      time: 60 * 5,
      timer: null,
      goHome: false,
      guideText: "등록한 이메일을 입력해주세요.",
    };
    this.gotoConfirmCodeKeyStep = this.gotoConfirmCodeKeyStep.bind(this);
    this.gotoChangePassStep = this.gotoChangePassStep.bind(this);
    this.requestChangePassword = this.requestChangePassword.bind(this);
    this.handleTimeOver = this.handleTimeOver.bind(this);
    this.startTimer = this.startTimer.bind(this);

    this.getEmailStep = React.createRef();
    this.confirmCodeKeyStep = React.createRef();
    this.changePassStep = React.createRef();
  }
  render() {
    return (
      <CardUI>
        <div className="form" ref={this.getEmailStep}>
          <h2 className="title">FindPass</h2>
          <p>{this.state.guideText}</p>
          <InputEmail
            placeholder="User Email"
            value={this.state.email}
            onChange={(e) => {
              this.setState({ email: e.target.value });
            }}
          />
          <div className="link-box">
            go to{" "}
            <Link className="link" to="/login">
              Log In
            </Link>
          </div>
          <Button onClick={this.gotoConfirmCodeKeyStep}>인증코드 보내기</Button>
        </div>
        <div className="form hidden" ref={this.confirmCodeKeyStep}>
          <h2 className="title">FindPass</h2>
          <p>{this.state.guideText}</p>
          <Timer time={this.state.time} onTimeOver={this.handleTimeOver} />
          <InputEmail
            placeholder="codekey"
            value={this.state.codeKey}
            onChange={(e) => {
              this.setState({ codeKey: e.target.value });
            }}
          />
          <div className="link-box">
            go to{" "}
            <Link className="link" to="/login">
              Log In
            </Link>
          </div>
          <Button onClick={this.gotoChangePassStep}>확인</Button>
        </div>
        <div className="form hidden" ref={this.changePassStep}>
          <h2 className="title">FindPass</h2>
          <p>{this.state.guideText}</p>
          <InputPassword
            placeholder="password"
            value={this.state.newPassword}
            onChange={(e) => {
              this.setState({ newPassword: e.target.value });
            }}
          />
          <div className="link-box">
            go to{" "}
            <Link className="link" to="/login">
              Log In
            </Link>
          </div>
          <Button onClick={this.requestChangePassword}>확인</Button>
        </div>
        {this.state.goHome && <Redirect to="login" />}
      </CardUI>
    );
  }
  gotoConfirmCodeKeyStep() {
    axios
      .get("http://localhost:3000/user/sendConfirmCode", {
        params: {
          email: this.state.email,
        },
      })
      .then((response) => {
        if (response.status === 200) {
          this.getEmailStep.current.classList.add("hidden");
          setTimeout(() => {
            this.confirmCodeKeyStep.current.classList.remove("hidden");
            this.setState({
              guideText: "이메일로 전송된 확인 코드를 입력해주세요",
            });
            this.startTimer(60 * 5);
          }, 500);
        } else {
          this.setState({
            guideText: "이메일을 확인 후 재시도 해주십시오",
          });
        }
      })
      .catch((err) => {
        console.error(err);
      });
  }
  gotoChangePassStep() {
    axios
      .post("http://localhost:3000/user/checkConfirmCode", {
        email: this.state.email,
        codeKey: this.state.codeKey,
      })
      .then((response) => {
        if (response.status === 200) {
          this.confirmCodeKeyStep.current.classList.add("hidden");
          setTimeout(() => {
            this.changePassStep.current.classList.remove("hidden");
            this.setState({
              guideText: "새 비밀번호를 입력해주세요",
            });
          }, 500);
          clearInterval(this.state.timer);
          this.setState({
            timer: null,
            time: -1,
          });
        }
      })
      .catch((err) => {
        this.setState({
          guideText: err.response.data.message,
        });
        console.error(err);
      });
  }
  requestChangePassword() {
    axios
      .patch("http://localhost:3000/user/updatePassword", {
        email: this.state.email,
        pw: this.state.newPassword,
      })
      .then((response) => {
        if (response.status === 200) {
          this.setState({
            goHome: true,
          });
        }
      })
      .catch((err) => {
        this.setState({
          guideText: "비밀번호 변경에 실패했습니다.",
        });
        console.error(err);
      });
  }
  handleTimeOver() {
    clearInterval(this.state.timer);
    this.setState({
      timer: null,
    });
    alert("시간이 초과되었습니다. 이메일 입력 페이지로 돌아갑니다.");
    this.confirmCodeKeyStep.current.classList.add("hidden");
    this.getEmailStep.current.classList.remove("hidden");
  }
  startTimer(second) {
    this.setState({
      time: second,
      timer: setInterval(() => {
        second--;
        this.setState({
          time: second,
        });
      }, 1000),
    });
  }
}

export default FindPassForm;
