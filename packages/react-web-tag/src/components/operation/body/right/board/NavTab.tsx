import { observer } from "mobx-react";
import React from "react";
import classNames from 'classnames';
import { Icon } from 'office-ui-fabric-react';
import { Operation } from "src/store";
import { IGraphValue } from 'src/models/operation';
interface IProps {
  operation: Operation,
  id: string;
}

@observer
export default class NavTab extends  React.Component<IProps> {

  delGraph = (e: any) => {
    const { id, operation } = this.props;
    const { delGraphId } = operation;
    delGraphId(id);
    e.stopPropagation();
  };

  render() {
    const { id, operation } = this.props;
    const { activeGraphId, changeActiveGraphId, graphMap } = operation;
    const graph: IGraphValue = graphMap[id];
    return (
      <div
        className={classNames('tab-wrap', { active: id === activeGraphId } )}
        onClick={() => changeActiveGraphId(id)}
        title={graph.name}
      >
        <div className="tab-left" />
        <div className="tab-content">
          <Icon iconName='TagSolid' className="tag-icon"/>
          <span className="tab-name">{graph.name}</span>
          <Icon iconName='ErrorBadge' className='close-icon' title='关闭' onClick={this.delGraph}/>
        </div>
        <div className="tab-right" />
      </div>
    );
  }
}
