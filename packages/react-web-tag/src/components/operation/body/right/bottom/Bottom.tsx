import { observer } from "mobx-react";
import React from "react";
import { Icon } from 'office-ui-fabric-react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import classNames from 'classnames';
import { Operation, System } from "src/store";
import { IGraphValue, ITagValue } from "src/models/operation";
import TagPanel from './TagPanel';

interface IProps {
  operation: Operation,
  system: System,
  width: number,
}

interface IState {
  transformX: number;
}



@observer
export default class Bottom extends  React.Component<IProps, IState> {

  private activeVId: string | undefined = undefined;

  constructor(props: IProps) {
    super(props);
    this.state = { transformX: 0 };
  }

  _calcActiveVId = (activeVId: string | undefined, tagVIds: string[]) => {
    const transformX = this._calculateFlow(activeVId, tagVIds);
    this.setState({ transformX });
    this.activeVId = activeVId;
  };

  _calculateFlow = (activeVId: string | undefined, tagVIds: string[]) => {
    const { width } = this.props;
    if (activeVId) {
      const index = tagVIds.indexOf(activeVId);
      const transformX = 112 * (index + 1) - (width - 30);
      if (transformX > 0) {
        return transformX;
      }
      return 0;
    }
    return 0;
  };

  _linkClick = (item?: PivotItem) => {
    if (item) {
      const { changeActiveVId } = this.props.operation;
      const vId = item.props.itemKey;
      if (vId) {
        changeActiveVId(vId);
      }
    }
  };

  _calculateScroll = (tagVIds: string[], width: number): boolean => {
    let isScroll = false;
    if (tagVIds.length * 112 > width - 30) {
      isScroll = true;
    }
    return isScroll;
  };

  _turnToLeft = () => {
    this.setState({ transformX: 0 });
  };

  _turnToRight = (tagVIds: string[]) => {
    const { width } = this.props;
    const transformX = 112 * tagVIds.length - (width - 30);
    if (transformX > 0) {
      this.setState({ transformX });
    }
  };

  render() {
    const { width, system, operation } = this.props;
    const { transformX } = this.state;
    const { graphMap, activeGraphId } = operation;
    const graph: IGraphValue | null = activeGraphId ? graphMap[activeGraphId] : null;
    const height = system.mainHeight - operation.boardHeight - 30;
    if (graph) {
      const { activeVId, vIds, tagMap } = graph;
      const tagVIds = vIds.filter((vId: string) => {
        return typeof tagMap[vId] === 'object';
      });
      const isScroll = this._calculateScroll(tagVIds, width);
      if (this.activeVId !== activeVId) {
        this._calcActiveVId(activeVId, tagVIds);
      }
      const aa: any = document.querySelector(".ms-Pivot");
      if (aa) {
        aa.style.transform = `translate3d(-${transformX}px, 0px, 0px)`
      }
      return (
        <div style={{ width, height }} className={classNames("bottom", { isScroll: isScroll } )}>
          <Icon iconName="CaretLeft8" className={classNames("left-icon", { disable: transformX === 0 } )} onClick={this._turnToLeft}/>
          <div className="pivot-content">
            <Pivot selectedKey={activeVId} onLinkClick={this._linkClick}>
              {tagVIds.map((vId: string) => {
                const tag = tagMap[vId] as ITagValue;
                return (
                  <PivotItem itemIcon={tag.icon} headerText={tag.name} itemKey={vId} key={`${activeGraphId}_${vId}`}>
                    <TagPanel operation={operation} vId={vId} width={width} height={height} tag={tag}/>
                  </PivotItem>
                );
              })}
            </Pivot>
          </div>
          <Icon iconName="CaretRight8" className="right-icon" onClick={() => this._turnToRight(tagVIds)}/>
        </div>
      )
    }
    return null;
  }
}
