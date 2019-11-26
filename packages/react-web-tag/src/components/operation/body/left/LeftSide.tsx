import { observer } from "mobx-react";
import React from "react";
import classNames from 'classnames';
import { Operation } from "src/store";
import { leftSideTypes, sideTypes } from 'src/constants/operationConstants';
import LeftStaticSide from './LeftStaticSide';
import LeftDynamicSide from './LeftDynamicSide';

interface IProps {
  operation: Operation,
  height: number;
}

@observer
export default class LeftSide extends  React.Component<IProps> {

  showLeftBody = () => {
    const { operation } = this.props;
    const { leftSideType } = operation;
    switch (leftSideType) {
      case sideTypes.static:
        return  <LeftStaticSide operation={operation}/>;
      case sideTypes.dynamic:
        return <LeftDynamicSide operation={operation} />;
    }
  };

  render() {
    const { height, operation } = this.props;
    const { leftSideType, leftWidth, setLeftSideType } = operation;
    return (
      <div className="left-side" style={{ height, width: leftWidth }}>
        <div className="left-side-bar">
          <ul>
            {leftSideTypes.map((sideType: { code: string, text: string }) => {
              return (
                <li key={sideType.code}>
                  <a className={classNames({active: sideType.code === leftSideType})} onClick={() => setLeftSideType(sideType.code)} >
                    <span>{sideType.text}</span>
                  </a>
                </li>
              );
            })}
          </ul>
        </div>
        {this.showLeftBody()}
      </div>
    );
  }
}
