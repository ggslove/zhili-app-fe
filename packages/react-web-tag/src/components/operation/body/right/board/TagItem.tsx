import { observer } from "mobx-react";
import React from "react";
import classNames from 'classnames';
import { Callout, DirectionalHint, getId, Icon } from "office-ui-fabric-react";
import { Col, Grid, Row } from "react-flexbox-grid";
import { Operation } from "src/store";
import { IOperator, ITagValue } from "src/models/operation";
import { leftOperators, operator, rightOperators } from "src/constants/operationConstants";

interface IProps {
  operation: Operation,
  width: number,
  tag: ITagValue,
  activeVId: string | undefined;
  vId: string;
  isNon: boolean;
  prevVId: string | undefined;
}

interface IState {
  isCalloutVisible: boolean;
}

@observer
export default class TagItem extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { isCalloutVisible: false };
  }
  private _menuButtonElement = React.createRef<HTMLDivElement>();
  private _titleId: string = getId('callout-label');

  _onDismiss = () => {
    this.setState({ isCalloutVisible: false });
  };

  _operatorClick = (item: IOperator) => {
    const { isNon, operation, prevVId, vId } = this.props;
    const { delNonOperator, addNonOperator, addBracket } = operation;
    if (item.code === operator.NON) {
      if (isNon && prevVId) {
        delNonOperator(prevVId);
      } else {
        addNonOperator(vId);
      }
    } else if (item.code === operator.LEFT) {
      addBracket(vId);
      this._onDismiss();
    }
  };

  _delTag = (e: any) => {
    const { vId, operation } = this.props;
    const { delTag } = operation;
    delTag(vId);
    e.stopPropagation();
  };

  _clickTag = () => {
    const { vId, operation } = this.props;
    const { isTemporaryByStart, changeActiveVId, passBracket, isDisableToRightBracket } = operation;
    if (isTemporaryByStart()) {
      if (!isDisableToRightBracket(vId)) {
        passBracket();
      }
    } else {
      changeActiveVId(vId);
    }
  };

  render() {
    const { tag, activeVId, isNon, vId, operation } = this.props;
    const { isCalloutVisible } = this.state;
    const { isTemporaryByStart, setHoverVId, isDisableToRightBracket } = operation;
    console.log(tag);
    return (
      <div
        className={classNames("tag-item", { active: activeVId === vId } )}
        onClick={this._clickTag}
        style={{ cursor: isTemporaryByStart() ? (isDisableToRightBracket(vId) ?  'not-allowed' : 'alias') : 'pointer' }}
        onMouseEnter={() => setHoverVId(vId)}
      >
        <div
          className={classNames("circle", { show: isCalloutVisible } )}
          onClick={() => this.setState({ isCalloutVisible: true })}
          ref={this._menuButtonElement}
        />
        <div className="tag-name" title={tag.name}>
          <Icon iconName={tag.icon}/>
          {tag.name}
        </div>
        <div className="close-icon">
          <Icon iconName="StatusErrorFull" title="删除" onClick={this._delTag}/>
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
            <div className="popover-operator" style={{ width: 90 }}>
              <Grid fluid>
                <Row>
                  {leftOperators.map((item: IOperator, index: number) => {
                    return (
                      <Col md={6} xs={6} key={item.code}>
                        <div
                          className={classNames("function-selector", { active: isNon && item.code === operator.NON } )}
                          title={item.name}
                          onClick={() => this._operatorClick(item)}
                        >
                          {item.iconName ? <Icon iconName={item.iconName} /> : <span>{item.text}</span>}
                        </div>
                        {rightOperators.length === index + 1 ? null : <div className="slider" />}
                      </Col>
                    )
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
