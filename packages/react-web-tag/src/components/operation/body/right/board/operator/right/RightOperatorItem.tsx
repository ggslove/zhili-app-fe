import { observer } from "mobx-react";
import React from "react";
import classNames from 'classnames';
import { Callout, getId, Icon, DirectionalHint } from 'office-ui-fabric-react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import { Operation } from "src/store";
import { IOperator } from 'src/models/operation';
import { rightOperators, operator } from 'src/constants/operationConstants';

interface IProps {
  operation: Operation,
  width: number,
  vId: string,
  operator: operator,
  activeVId: string,
}

interface IState {
  isCalloutVisible: boolean;
}
@observer
export default class RightOperatorItem extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { isCalloutVisible: false };
  }
  private _menuButtonElement = React.createRef<HTMLDivElement>();
  private _titleId: string = getId('callout-label');

  _onDismiss = () => {
    this.setState({ isCalloutVisible: false });
  };

  _clickTag = () => {
    const { operation, vId } = this.props;
    const { isTemporaryByStart, isDisableToRightBracket, passBracket } = operation;
    if (isTemporaryByStart()) {
      if (!isDisableToRightBracket(vId)) {
        passBracket();
      }
    } else {
      this.setState({ isCalloutVisible: true });
    }
  };

  render() {
    const { vId, operation, operator } = this.props;
    const missOperator = rightOperators.filter((item: IOperator) => {
      return item.code === operator;
    })[0];
    const { changeRightOperator, setHoverVId, isTemporaryByStart, isDisableToRightBracket } = operation;
    const { isCalloutVisible  } = this.state;
    return (
      <div
        className="operator-item"
        onClick={this._clickTag}
        onMouseEnter={() => setHoverVId(vId)}
        style={{ cursor: isTemporaryByStart() ? (isDisableToRightBracket(vId) ?  'not-allowed' : 'alias') : 'pointer' }}
      >
        <div ref={this._menuButtonElement} className="operator-center">
          {missOperator ? <Icon iconName={missOperator.iconName} title={missOperator.name}/> : null}
        </div>
        {isCalloutVisible  ?
          <Callout
            role="alertdialog"
            ariaLabelledBy={this._titleId}
            className="ms-CalloutExample-callout"
            gapSpace={0}
            target={this._menuButtonElement}
            onDismiss={this._onDismiss}
            setInitialFocus={true}
            directionalHint={DirectionalHint.bottomCenter}
          >
            <div className="popover-operator">
              <Grid fluid>
                <Row>
                  {rightOperators.map((item: IOperator ,index: number) => {
                    return (
                      <Col md={4} xs={6} key={item.code}>
                        <div
                          className={classNames("operator-selector", {active: item.code === operator})}
                          title={item.name}
                          onClick={() => {changeRightOperator(item.code, vId);this._onDismiss()}}
                        >
                          {item.iconName ? <Icon iconName={item.iconName} /> : <span>{item.text}</span>}
                        </div>
                        {rightOperators.length === index + 1 ? null : <div className="slider" /> }
                      </Col>
                    );
                  })}
                </Row>
              </Grid>
            </div>
          </Callout>
        : null }
      </div>
    );
  }
}
