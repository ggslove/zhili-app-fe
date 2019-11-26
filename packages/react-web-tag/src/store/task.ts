import { observable, action } from 'mobx';
import { ILeftData, IPage } from 'models/task';

// 任务
class Task {
  @observable leftWidth: number;
  @observable leftData: ILeftData;
  @observable activeId: string;

  constructor () {
    this.leftWidth = 270;
    this.leftData = {
      name: '',
      pagination: { current: 0, total: 0, pageSize: 10 },
      taskList: [
        {
          name: '任务清单1',
          taskHistory: [{ name: '历史清单1' }],
          pagination: { current: 0, total: 0, pageSize: 10 },
          isExpand: false,
        }
      ],
    };
    this.activeId = '';
  }

  @action changeLeftName = (name: string) => {
    this.leftData.name = name;
  }

}

export default Task;
