import { observer } from "mobx-react";
import React from "react";
import { CommandBarButton, IIconProps, Stack } from 'office-ui-fabric-react';
import { Operation } from "src/store";
import TagAddDialog from './TagAddDialog';
import TagSaveAsDialog from './TagSaveAsDialog';
import { dialogTypes } from 'src/constants/operationConstants';
interface IProps {
  operation: Operation,
}
interface IState {
  dialogType: string | null,
}
const addIcon: IIconProps = { iconName: 'Add' };
const saveIcon: IIconProps = { iconName: 'Save' };
const saveAsIcon: IIconProps = { iconName: 'SaveAs' };
const runIcon: IIconProps = { iconName: 'Play' };

@observer
export default class Toolbar extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { dialogType: null }
  }

  _closeDialog = () => {
    this.setState({ dialogType: null });
  };

  render() {
    const { operation } = this.props;
    const { dialogType } = this.state;
    const { toolbarHeight, activeGraphId } = operation;
    return (
      <div className='toolbar' style={{ height: toolbarHeight }}>
        <Stack horizontal>
          <CommandBarButton
            iconProps={addIcon}
            onClick={() => this.setState({ dialogType: dialogTypes.ADDTAG })}
            title="新增"
            text="新增"
          />
          <CommandBarButton
            iconProps={saveIcon}
            disabled={!activeGraphId}
            title="保存"
            text="保存"
          />
          <CommandBarButton
            iconProps={saveAsIcon}
            disabled={!activeGraphId}
            onClick={() => this.setState({ dialogType: dialogTypes.SAVEAS })}
            title="另存为"
            text="另存为"
          />
          <CommandBarButton
            iconProps={runIcon}
            disabled={!activeGraphId}
            title="执行"
            text="执行"
          />
        </Stack>
        <TagAddDialog operation={operation} isHidden={dialogType !== dialogTypes.ADDTAG} closeDialog={this._closeDialog} />
        <TagSaveAsDialog operation={operation} isHidden={dialogType !== dialogTypes.SAVEAS} closeDialog={this._closeDialog} />
      </div>
    );
  }
}
