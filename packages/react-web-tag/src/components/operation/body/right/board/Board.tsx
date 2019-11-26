import { observer } from "mobx-react";
import React from "react";
import { CSSTransition } from "react-transition-group";
import { Operation, System } from "src/store";
import NavTabs from './NavTabs';
import BoardCenter from './BoardCenter';
interface IProps {
  operation: Operation,
  system: System,
  width: number,
}

@observer
export default class Board extends  React.Component<IProps> {
  render() {
    const { operation, width } = this.props;
    const height = operation.boardHeight;
    return (
      <div style={{ width, height }} className="board">
        <NavTabs operation={operation} width={width} />
        <CSSTransition timeout={200}>
          <BoardCenter operation={operation} width={width} />
        </CSSTransition>
      </div>
    );
  }
}
