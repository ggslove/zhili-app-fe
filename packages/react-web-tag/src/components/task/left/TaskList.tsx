import { observer } from "mobx-react";
import React from "react";
import { Icon, Text } from "office-ui-fabric-react";
import { Pagination } from 'antd';
import { System, Task } from "src/store";
import TaskItem from './TaskItem';
import { ITask } from "src/models/task";

interface IProps {
  system: System,
  task: Task,
}

@observer
export default class TaskList extends  React.Component<IProps> {
  render() {
    const { system, task } = this.props;
    const { mainHeight } = system;
    const { activeId } = task;
    const { pagination, taskList } = task.leftData;
    return (
      <div style={{ height: mainHeight - 85 }} className="task-list">
        <div className="overall">
          <Icon iconName="TaskManager" />
          <Text variant="small" className="title-name">总览</Text>
        </div>
        <div style={{ minHeight: mainHeight - 145 }}>
          {taskList.map((taskItem: ITask, index: number) => {
            return <TaskItem  key={`task-${index}`} system={system} taskItem={taskItem}  />;
          })}
        </div>
        <Pagination {...pagination} size="small" />
      </div>
    );
  }
}
