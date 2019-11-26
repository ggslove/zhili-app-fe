import { observable } from "mobx";

export interface IUser {
  isLogin: boolean;
  userInfo?: { name: string, username: string, id: number };
}
