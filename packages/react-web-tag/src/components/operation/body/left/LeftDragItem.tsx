import { observer } from "mobx-react";
import React from "react";
import { Icon } from 'office-ui-fabric-react';
import { Operation } from "src/store";
import { Card } from "@uifabric/react-cards";
import { dragType, dragIcon, dragName, dragRel } from 'src/constants/operationConstants';
import { tagTypeIconMap } from 'src/constants/operationConstants';

interface IProps {
  operation: Operation,
  item: any;
}

@observer
export default class LeftDragItem extends  React.Component<IProps> {
  render() {
    const { operation, item } = this.props;
    const nameWidth = operation.leftWidth - 80;
    return (
      <div
        draggable={true}
        className="left-drag-item"
        onDragStart={(e)=>{
          e.dataTransfer.setData(dragType, 'resTbl');
          e.dataTransfer.setData(dragName, item.name);
          e.dataTransfer.setData(dragRel, '');
          e.dataTransfer.setData(dragIcon, tagTypeIconMap[item.type as string]);
        }}
      >
        <Card horizontal>
          <Card.Item fill>
            <Icon iconName={tagTypeIconMap[item.type as string]} />
          </Card.Item>
          <Card.Section>
            <div className="tag-name" style={{ width: nameWidth }} >
              {item.name}
            </div>
          </Card.Section>
        </Card>
      </div>
    )
  }
}
