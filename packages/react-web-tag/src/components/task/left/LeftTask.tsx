import { observer } from "mobx-react";
import React from "react";
import { Label, Text, Icon, SearchBox } from 'office-ui-fabric-react';
import { System, Task } from "src/store";
import TaskList from './TaskList';

interface IProps {
  system: System,
  task: Task,
}

@observer
export default class LeftTask extends  React.Component<IProps> {

  render() {
    const { system, task } = this.props;
    const { mainHeight } = system;
    const { changeLeftName } = task;
    const { name } = task.leftData;
    return (
      <div className='left-task' style={{ height: mainHeight - 20 }}>
        <Label className="head-bar">
          <Text variant="small" className="font600" >任务中心</Text>
          <div className='add-action'>
            <Icon iconName="CalculatorAddition" />
          </div>
        </Label>
        <SearchBox placeholder="查询" underlined={true} value={name} onChange={(e, newValue) => changeLeftName(newValue || '')} />
        <TaskList system={system} task={task} />
      </div>
    )
  }
}
