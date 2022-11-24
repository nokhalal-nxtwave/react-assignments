import { ChangeEvent, Component, FormEvent } from "react";
import "./index.css";
import Cookies from "js-cookie";
import { Redirect, RouteComponentProps, withRouter } from "react-router-dom";
import { inject, observer } from "mobx-react";

type PropsType = RouteComponentProps & {
  LoginFormStore?: {
    username: string;
    password: string;
    error: string;
    error_msg: string;
    setError: (value: boolean) => void;
    setErrorMsg: (value: string) => {};
    setPassword: (value: string) => {};
    setUserName: (value: string) => {};
    submitForm:(f:Function)=>void;
  };
};
@inject("LoginFormStore")
@observer
class LoginForm extends Component<PropsType> {
  loginFormStore = this.props.LoginFormStore;

  onSubmitSuccess = (jwt_token: string) => {
    Cookies.set("jwt_token", jwt_token, { expires: 1 });
    const { history } = this.props;
    history.replace("/JobbyTypescript");
  };

  submitForm = async (event: FormEvent) => {
    event.preventDefault();
    this.loginFormStore?.submitForm(this.onSubmitSuccess);
  };

  onChangeUsername = (event: ChangeEvent<HTMLInputElement>) => {
    this.loginFormStore?.setUserName(event.target.value);
  };

  onChangePassword = (event: ChangeEvent<HTMLInputElement>) => {
    this.loginFormStore?.setPassword(event.target.value);
  };

  render() {
    if (Cookies.get("jwt_token")) {
      return <Redirect to="/JobbyTypescript" />;
    }
    const { username, password, error, error_msg } = this.loginFormStore!;
    return (
      <form className="jobby-form-container" onSubmit={this.submitForm}>
        <div className="jobby-login-website-logo">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </div>
        <label className="jobby-input-label">USERNAME</label>
        <input
          type="text"
          id="username"
          className="jobby-input-field"
          value={username}
          placeholder="Username"
          onChange={this.onChangeUsername}
        />
        <label className="jobby-input-label">PASSWORD</label>
        <input
          type="password"
          id="password"
          className="jobby-input-field"
          value={password}
          placeholder="Password"
          onChange={this.onChangePassword}
        />
        <button type="submit" className="jobby-login-button">
          Login
        </button>
        {error && <p className="jobby-error-message">*{error_msg}</p>}
      </form>
    );
  }
}

export default withRouter(LoginForm);
