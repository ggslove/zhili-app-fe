import React from 'react';
import { inject, observer } from 'mobx-react';
import { System } from 'src/store';

interface IState {
  username: string;
  password: string;
}

@inject('system')
@observer
export default class Login extends  React.Component<System, IState> {
  constructor(props: System) {
    super(props);
    this.state = { username: '', password: '' };
  }
  render() {
    const { username, password } = this.state;
    return (
      <div className="login">
        <div className="login-section">
          <img alt="login-title" src="login_title.png" className="login-title" />
          <dl className="login-warp">
            <h1>欢迎登录</h1>
            <dt className="core-radius">
              <img alt="username" src="login_username_ico.png" />
              <p><input value={username} type="text" placeholder="请输入用户名"/></p>
            </dt>
            <dt className="core-radius">
              <img alt="password" src="login_password_ico.png"/>
              <p><input value={password} type="password" placeholder="请输入密码"/></p>
            </dt>
            <dt>
              <span className="name-btn core-radius">用户名登录</span>
            </dt>
          </dl>
        </div>
      </div>
    );
  }
}

