import { observer } from "mobx-react";
import React from "react";
import { Icon, Text } from 'office-ui-fabric-react';
import { Popover } from 'antd';
import { Operation } from "src/store";
import classNames from "classnames";
import TagEditDialog from "./TagEditDialog";
import TagShareDialog from "./TagShareDialog";

interface IProps {
  operation: Operation,
  item: any;
}

interface IState {
  visible: boolean;
  isShowEditDialog: boolean;
  isShowShareDialog: boolean;
}

@observer
export default class LeftDynamicItem extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { visible: false, isShowEditDialog: false, isShowShareDialog: false };
  }

  private _editTag = () => {
    this.setState({ visible: false, isShowEditDialog: true });
  };

  private _shareTag = () => {
    this.setState({ visible: false, isShowShareDialog: true });
  };

  private _closeDialog = () => {
    this.setState({ isShowEditDialog: false, isShowShareDialog: false });
  };

  private _showIcon = () => {
    const { visible } = this.state;
    return (
      <Popover
        content={
          <ul className="tag-bar">
            <li onClick={this._editTag}>修改</li>
            <li onClick={this._shareTag}>共享</li>
          </ul>
        }
        trigger="click"
        visible={visible}
        placement="right"
        onVisibleChange={() => this.setState({ visible: !visible })}
      >
        <Icon iconName="MoreVertical" className="more-icon" title='操作'/>
      </Popover>
    );
  };

  private _showIconShare = () => {
    return (
      <Icon iconName="Cloud" title='已共享' className="share-icon"/>
    );
  };

  render() {
    const { operation, item } = this.props;
    const { visible, isShowEditDialog, isShowShareDialog } = this.state;
    const { graphIds, checkGraphId } = operation;
    return (
      <div
        className={classNames("tag-item", {active: graphIds.indexOf(item) > -1, 'action-bar': visible})}
        onDoubleClick={() => checkGraphId(item)}
        title={item}
      >
        <Icon iconName="TagSolid" className="tag-icon" />
        <Text className="tag-name">{item}</Text>
        {this._showIcon()}
        <Icon iconName="PinnedSolid" />
        {isShowEditDialog ? <TagEditDialog operation={operation} closeDialog={this._closeDialog} item={item}/> : null}
        {isShowShareDialog ? <TagShareDialog operation={operation} closeDialog={this._closeDialog} item={item}/> : null}
      </div>
    )
  }
}
