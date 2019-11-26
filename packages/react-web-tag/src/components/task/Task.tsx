import { inject, observer } from "mobx-react";
import React from "react";
// import { System, Task } from "src/store";
// import LeftTask from './left/LeftTask';

interface IProps {
  // system: System,
  // task: Task,
}

@inject('system', 'task')
@observer
export default class TaskDom extends  React.Component<IProps> {
  render() {
    // const { system, task } = this.props;
    // const { mainHeight } = system;
    const mainHeight=10;
    return (
      <div className="task" style={ { height: mainHeight } }>
        {/* <LeftTask system={system} task={task} /> */}
      </div>
    );
  }
}
