import { observer } from "mobx-react";
import React from "react";
import classNames from 'classnames';
import { Icon } from "office-ui-fabric-react";
import { Operation } from "src/store";
import NavTab from './NavTab';

interface IProps {
  operation: Operation,
  width: number,
}

interface IState {
  transformX: number;
}

@observer
export default class NavTabs extends  React.Component<IProps, IState> {

  private activeGraphId: string | undefined = undefined;

  constructor(props: IProps) {
    super(props);
    this.state = { transformX: 0 };
  }

  _calcActiveGraphId = (activeGraphId: string | undefined) => {
    const transformX = this._calculateFlow();
    this.setState({ transformX });
    this.activeGraphId = activeGraphId;
  };

  _calculateFlow = () => {
    const { width, operation } = this.props;
    const { activeGraphId, graphIds } = operation;
    if (activeGraphId) {
      const index = graphIds.indexOf(activeGraphId);
      const transformX = 128 * (index + 1) - (width - 23);
      if (transformX > 0) {
        return transformX;
      }
      return 0;
    }
    return 0;
  };

  _turnToLeft = () => {
    this.setState({ transformX: 0 });
  };

  _turnToRight = () => {
    const { width, operation } = this.props;
    const { graphIds } = operation;
    const transformX = 128 * graphIds.length - (width - 23);
    if (transformX > 0) {
      this.setState({ transformX });
    }
  };

  _calculateScroll = (): boolean => {
    const { width, operation } = this.props;
    const { graphIds } = operation;
    let isScroll = false;
    if (graphIds.length * 128 > width - 43) {
      isScroll = true;
    }
    return isScroll;
  };

  render() {
    const { operation, width } = this.props;
    const { transformX } = this.state;
    const { graphIds, activeGraphId } = operation;
    const isScroll = this._calculateScroll();
    if (this.activeGraphId !== activeGraphId) {
      this._calcActiveGraphId(activeGraphId);
    }
    return (
      <div>
        <div className={classNames("nav-tabs", { isScroll: isScroll })}>
          <Icon iconName="CaretLeft8" className={classNames("left-icon", { disable: transformX === 0 })} onClick={this._turnToLeft}/>
          <div className="nav-content">
            <div className="nav-wrapper" style={{ transform: `translate3d(-${transformX}px, 0px, 0px)` }}>
              {graphIds.map((id: string) => {
                return <NavTab key={id} operation={operation} id={id}/>
              })}
            </div>
          </div>
          <Icon
            iconName="CaretRight8"
            className={classNames("right-icon", { disable: transformX === 128 * graphIds.length - (width - 23) })}
            onClick={this._turnToRight}
          />
        </div>
      </div>
    );
  }
}
