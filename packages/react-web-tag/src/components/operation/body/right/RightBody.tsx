import { observer } from "mobx-react";
import React from "react";
import { Operation, System } from "src/store";
import Board from './board/Board';
import Bottom from './bottom/Bottom';
interface IProps {
  operation: Operation,
  system: System,
  height: number,
}

@observer
export default class RightBody extends  React.Component<IProps> {

  mouseUpMoveSide = () => {
    document.onmousemove = null;
  };

  mouseDownMoveSide = (e: any) => {
    let by = e.clientY;
    let prevY = 0;
    document.onmousemove = (event) => {
      const { boardHeight, moveBoardHeight } = this.props.operation;
      let nextY = event.clientY - by;
      let newBoardHeight = boardHeight + nextY - prevY;
      if (newBoardHeight < 180) {
        newBoardHeight = 180;
      } else if (newBoardHeight > 250 ) {
        newBoardHeight = 250;
      }
      moveBoardHeight(newBoardHeight);
      prevY = nextY;
    };
    document.onmouseup = () => {
      document.onmousemove = null;
    };
    e.stopPropagation();
  };

  render() {
    const { operation, height, system } = this.props;
    const width = system.width - operation.leftWidth - 4;
    const sashHeight = operation.boardHeight + 2;
    return (
      <div style={{ height, width }} className="right-body">
        <Board system={system} operation={operation} width={width} />
        <div
          className="sash-down"
          style={{ width, transform: `matrix(1, 0, 0, 1, 4, ${sashHeight})` }}
          onMouseDown={this.mouseDownMoveSide}
          onMouseUp={this.mouseUpMoveSide}
        />
        <Bottom system={system} operation={operation} width={width} />
      </div>
    );
  }
}
