import { observable, action, computed } from 'mobx';
// 系统状态
class System {
  @observable width: number;
  @observable height: number;
  @observable headHeight: number;

  constructor () {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.headHeight = 48;
  }

  @action
  async resize() {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
  }

  @computed
  get mainHeight(): number {
    return this.height - this.headHeight;
  }
}

export default System;
