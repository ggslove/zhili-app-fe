import { observer } from "mobx-react";
import React from "react";
import { Icon } from 'office-ui-fabric-react';
import { Operation } from "src/store";
import { IOperator } from 'src/models/operation';
import { leftOperators, operator } from 'src/constants/operationConstants';
interface IProps {
  operation: Operation,
  width: number,
  vId: string,
  operator: operator,
  activeVId: string,
}

@observer
export default class NonOperatorItem extends  React.Component<IProps> {

  showIcon = (missOperator: IOperator) => {
    if (missOperator.iconName) {
      return <Icon iconName={missOperator.iconName} title={missOperator.name}/>;
    }
    return <span title={missOperator.name}>{missOperator.text}</span>;
  };

  _click = () => {
    const { vId, operation } = this.props;
    const { isDisableToRightBracket, isTemporaryByStart, passBracket } = operation;
    if (isTemporaryByStart()) {
      if (!isDisableToRightBracket(vId)) {
        passBracket();
      }
    }
  };

  render() {
    const { operator, operation, vId } = this.props;
    const { delNonOperator, setHoverVId }= operation;
    const missOperator: IOperator | undefined = leftOperators.filter((item: IOperator) => {
      return item.code === operator;
    })[0];
    return (
      <div
        className="operator-item bracket"
        onClick={this._click}
        onMouseEnter={() => setHoverVId(vId)}
      >
        <div className="operator-center">
          {missOperator ? this.showIcon(missOperator) : null}
        </div>
        <div className="close-icon">
          <Icon iconName="StatusErrorFull" title="删除" onClick={() => delNonOperator(vId)} />
        </div>
      </div>
    );
  }
}
