import { observer } from "mobx-react";
import React from "react";
import { Pagination } from 'antd';
import { Icon, Text } from "office-ui-fabric-react";
import { System } from "src/store";
import { ITask } from "src/models/task";

interface IProps {
  system: System,
  taskItem: ITask,
}

@observer
export default class TaskItem extends  React.Component<IProps> {
  render() {
    const { taskItem } = this.props;
    return (
      <div className="task-item">
        <div className="task-title">
          <Icon iconName="FabricFolder" />
          <Text variant="small" className="title-name">{taskItem.name}</Text>
        </div>
        <div className="task-history">
          <div className="task-history-item">
            <Icon iconName="DateTime2" />
            <Text variant="small" className="title-name">任务条目</Text>
          </div>
          <div className="task-history-item">
            <Icon iconName="DateTime2" />
            <Text variant="small" className="title-name">任务条目</Text>
          </div>
          <Pagination simple size="small" />
        </div>
      </div>
    );
  }
}
