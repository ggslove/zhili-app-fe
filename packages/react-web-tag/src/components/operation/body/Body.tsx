import { observer } from "mobx-react";
import React from "react";
import { Operation, System } from "src/store";
import RightBody from './right/RightBody';
import LeftSide from './left/LeftSide';
import { Image } from "office-ui-fabric-react";

interface IProps {
  operation: Operation,
  system: System,
}

@observer
export default class Body extends  React.Component<IProps> {

  mouseUpMoveSide = () => {
    document.onmousemove = null;
  };

  mouseDownMoveSide = (e: any) => {
    let bx = e.clientX;
    let prevX = 0;
    document.onmousemove = (event) => {
      const { leftWidth, moveWidth } = this.props.operation;
      let nextX = event.clientX - bx;
      let newLeftWidth = leftWidth + nextX - prevX;
      if (newLeftWidth < 220) {
        newLeftWidth = 220;
      } else if (newLeftWidth > 300 ) {
        newLeftWidth = 300;
      }
      moveWidth(newLeftWidth);
      prevX = nextX;
    };
    document.onmouseup = () => {
      document.onmousemove = null;
    };
    e.stopPropagation();
  };

  render() {
    const { system, operation } = this.props;
    const { activeGraphId } = operation;
    const height = system.mainHeight - operation.toolbarHeight - 2;
    const leftWidth = operation.leftWidth + 2;
    const width = system.width - operation.leftWidth - 4;
    return (
      <div className="body" style={{ height }}>
        <LeftSide operation={operation} height={height} />
        <div
          className="sash"
          style={{ transform: `matrix(1, 0, 0, 1, ${leftWidth}, 0)` }}
          onMouseDown={this.mouseDownMoveSide}
          onMouseUp={this.mouseUpMoveSide}
        />
        { activeGraphId
          ?
          <RightBody system={system} operation={operation} height={height} />
          :
          <div className="no-data" style={{ width, marginLeft: leftWidth }} >
            <Image src='/img/no-data1.png'/>
          </div>
        }
      </div>
    );
  }
}
