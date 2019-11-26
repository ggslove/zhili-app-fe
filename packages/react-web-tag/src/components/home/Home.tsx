import React from 'react';
import { inject, observer } from 'mobx-react';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from 'office-ui-fabric-react/lib/DetailsList';
import TagAddDialog from './TagAddDialog';

import { System, Operation } from 'src/store';
import TagCard from './TagCard';
import { dialogTypes } from "src/constants/operationConstants";

interface IProps {
  system: System;
  operation: Operation;
}

interface IDetailsListBasicExampleItem {
  key: number;
  name: string;
  value: number;
}

interface IState {
  isShow: boolean;
  items: IDetailsListBasicExampleItem[];
  dialogType: dialogTypes | null;
}

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 }
};

@inject('system', 'operation')
@observer
export default class Home extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    const _allItems = [];
    for (let i = 0; i < 20; i++) {
      _allItems.push({
        key: i,
        name: 'Item ' + i,
        value: i
      });
    }
    this.state = { isShow: true,items: _allItems, dialogType: null }
  }

  _changeIsShow = (isShow: boolean) => {
    this.setState({ isShow });
  };

  _columns: IColumn[] = [
    { key: 'column1', name: '标签名', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column2', name: '最近操作时间', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column3', name: '最近操作人', fieldName: 'who', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column4', name: '共享', fieldName: 'who', minWidth: 100, maxWidth: 200, isResizable: true }
  ];

  _closeDialog = () => {
    this.setState({ dialogType: null });
  };

  _openDialog = (dialogType: dialogTypes) => {
    this.setState({ dialogType });
  };

  render() {
    const { system, operation } = this.props;
    const { isShow, items, dialogType } = this.state;
    const { mainHeight } = system;
    return (
      <div className="home" style={{ height: mainHeight }}>
        <TagCard isShow={isShow} system={system} _changeIsShow={this._changeIsShow} _openDialog={this._openDialog} />
        <Pivot>
          <PivotItem headerText="最近操作">
            <DetailsList
              items={items}
              columns={this._columns}
              setKey="set"
              layoutMode={DetailsListLayoutMode.justified}
              selectionMode={SelectionMode.none}
              selectionPreservedOnEmptyClick={true}
              ariaLabelForSelectionColumn="Toggle selection"
              ariaLabelForSelectAllCheckbox="Toggle selection for all items"
              checkButtonAriaLabel="Row checkbox"
            />
          </PivotItem>
          <PivotItem headerText="关注">
            <Label styles={labelStyles}>Pivot #2</Label>
          </PivotItem>
          <PivotItem headerText="共享">
            <Label styles={labelStyles}>Pivot #3</Label>
          </PivotItem>
        </Pivot>
        <TagAddDialog operation={operation} isHidden={dialogType !== dialogTypes.ADDTAG} closeDialog={this._closeDialog} />
      </div>
    )
  }
}

