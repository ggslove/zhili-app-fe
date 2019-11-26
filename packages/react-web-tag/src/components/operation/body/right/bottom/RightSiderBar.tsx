import { Operation } from "src/store";
import { observer } from "mobx-react";
import classNames from 'classnames';
import React from "react";
import { rightTypes } from 'src/constants/operationConstants';

interface IProps {
  operation: Operation,
  vId: string,
  height: number,
  rightType: string | null,
}

@observer
export default class RightSiderBar extends  React.Component<IProps> {
  render() {
    const { height, rightType, operation, vId } = this.props;
    const { changeRightType } = operation;
    return (
      <nav className="right-side-bar" style={{ height }}>
        <ul>
          <li>
            <a
              className={classNames({ active: rightType === rightTypes.REVIEW  })}
              onClick={() => changeRightType(rightType === rightTypes.REVIEW ? null : rightTypes.REVIEW, vId )}
            >
              <span>预览数据</span>
            </a>
          </li>
          <li>
            <a
              className={classNames({ active: rightType === rightTypes.DETAILS })}
              onClick={() => changeRightType(rightType === rightTypes.DETAILS ? null : rightTypes.DETAILS, vId )}
            >
              <span>标签信息</span>
            </a>
          </li>
        </ul>
      </nav>
    );
  }
}
