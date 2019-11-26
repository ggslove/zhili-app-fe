import { observable, action } from 'mobx';
import { IUser } from 'src/models';

// 登录注册状态
class User {
  @observable isLogin: boolean;
  @observable userInfo?: { name: string, username: string, id: number };

  constructor () {
    this.isLogin = true;
    this.userInfo = { name: '系统管理员', username: 'zladmin', id: 1 };
  }

  @action checkLogin() {

  }

  @action setUser ({ isLogin, userInfo }: IUser) {
    this.isLogin = isLogin;
    this.userInfo = userInfo;
  }

  @action signOut () {
    this.isLogin = false;
    this.userInfo = undefined;
  }
}

export default User;
