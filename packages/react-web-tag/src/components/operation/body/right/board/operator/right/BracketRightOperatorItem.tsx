import { observer } from "mobx-react";
import React from "react";
import { Icon } from 'office-ui-fabric-react';
import classNames from 'classnames';
import { Operation } from "src/store";
import { operator } from 'src/constants/operationConstants';
import { IBracket } from "src/models/operation";
interface IProps {
  operation: Operation,
  width: number,
  vId: string,
  operator: operator,
  activeVId: string,
}

@observer
export default class BracketRightOperatorItem extends  React.Component<IProps> {

  _delOperator = (e: any) => {
    const { operation, vId } = this.props;
    const { delBracket } = operation;
    delBracket(vId);
    e.stopPropagation();
  };

  getIsTemporaryByEnd = (vId: string) => {
    const { operation } = this.props;
    const activeGraphId = operation.activeGraphId;
    if (activeGraphId) {
      const brackets = operation.graphMap[activeGraphId].brackets.filter((bracket: IBracket) => {
        return bracket.end === vId;
      });
      return brackets[0] ? brackets[0].isTemporary : false ;
    }
    return false;
  };

  _click = () => {
    const { vId, operation } = this.props;
    const { isDisableToRightBracket, changeActiveVId, isTemporaryByStart, passBracket } = operation;
    if (isTemporaryByStart()) {
      if (!isDisableToRightBracket(vId)) {
        passBracket();
      }
    } else {
      changeActiveVId(vId);
    }
  };

  render() {
    const { operation, vId, activeVId } = this.props;
    const { rightBracketVId, setHoverVId, isTemporaryByStart, isDisableToRightBracket }= operation;
    const isTemporary = this.getIsTemporaryByEnd(vId);
    if (isTemporary) {
      return (
        <div
          className="operator-item bracket temporary"
          onClick={this._click}
          onMouseEnter={() => setHoverVId(vId)}
          style={{ cursor: isTemporaryByStart() ? (isDisableToRightBracket(vId) ?  'not-allowed' : 'alias') : 'pointer' }}
        >
          <div className="operator-center">
            <span title='右侧括号'>)</span>
          </div>
          <div className="close-icon">
            <Icon iconName="StatusErrorFull" title="删除" onClick={this._delOperator} />
          </div>
        </div>
      );
    }
    return (
      <div
        className={classNames('operator-item bracket', { active: vId === activeVId || (rightBracketVId && rightBracketVId === vId) } )}
        onClick={this._click}
        onMouseEnter={() => setHoverVId(vId)}
        style={{ cursor: isTemporaryByStart() ? (isDisableToRightBracket(vId) ?  'not-allowed' : 'alias') : 'pointer' }}
      >
        <div className="operator-center">
          <span title='右侧括号'>)</span>
        </div>
        <div className="close-icon">
          <Icon iconName="StatusErrorFull" title="删除" onClick={this._delOperator} />
        </div>
      </div>
    );
  }
}
