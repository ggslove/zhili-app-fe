import { observer } from "mobx-react";
import React from "react";
import {
  DetailsList,
  DetailsListLayoutMode,
  IColumn,
  Selection,
  SearchBox,
  SelectionMode,
  MessageBar,
  MessageBarType,
  HoverCard,
  HoverCardType,
  IPlainCardProps,
} from 'office-ui-fabric-react';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Pagination } from 'antd';
import { mergeStyles, mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { System } from "src/store";

interface IProps {
  closeDialog: () => void;
  system: System;
}

interface IDetailsListBasicExampleItem {
  key: number;
  name: string;
  value: number;
}

interface IState {
  items: IDetailsListBasicExampleItem[];
  selectionDetails: {};
  name: string;
  isShow: boolean;
}

const itemClass = mergeStyles({
  selectors: {
    '&:hover': {
      textDecoration: 'underline',
      cursor: 'pointer',
      color: '#2b579a',
    }
  }
});

@observer
export default class SqlDialog extends  React.Component<IProps, IState> {

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
    this.state = { items: _allItems, selectionDetails: this._getSelectionDetails(), name: '', isShow: false };
  }

  _selection = new Selection({
    onSelectionChanged: () => this.setState({ selectionDetails: this._getSelectionDetails() })
  });

  private _getSelectionDetails(): string {
    const selectionCount = this._selection.getSelectedCount();
    switch (selectionCount) {
      case 0:
        return '';
      case 1:
        return `${(this._selection.getSelection()[0] as IDetailsListBasicExampleItem).key}`;
      default:
        return '';
    }
  }

  private _submit = () => {
    const { selectionDetails } =  this.state;
    if (selectionDetails) {

    } else {
      this.setState({ isShow: true });
    }
  };

  _nameChange = (event?: React.ChangeEvent<HTMLInputElement>, newValue?: string) => {
    this.setState({ name: newValue || '' });
  };

  _columns: IColumn[] = [
    { key: 'key', name: 'SQL名', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'name', name: '创建时间', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'value', name: '证件字段', fieldName: 'who', minWidth: 100, maxWidth: 200, isResizable: true },
  ];

  _onRenderPlainCard = (item: IDetailsListBasicExampleItem): JSX.Element => {
    return <div className="card-hover">
      SELECT TABLE_SCHEMA as tableSchema,TABLE_NAME as tableName,TABLE_COMMENT as tableComment FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='base table' and table_name = '123';
    </div>;
  };

  private _onRenderItemColumn = (item?: IDetailsListBasicExampleItem, index?: number, column?: IColumn): JSX.Element | React.ReactText => {
    if (item && column) {
      const plainCardProps: IPlainCardProps = {
        onRenderPlainCard: this._onRenderPlainCard,
        renderData: item
      };
      if (column.key === 'key') {
        return (
          <HoverCard plainCardProps={plainCardProps} instantOpenOnClick={true} type={HoverCardType.plain}>
            <div className={itemClass} >
              {item.key}
            </div>
          </HoverCard>
        );
      }
      return item[column.key as keyof IDetailsListBasicExampleItem];
    }
    return '';
  };

  render() {
    const { closeDialog, system } = this.props;
    const { items, name, isShow } = this.state;
    const { mainHeight, width } = system;
    return (
      <Dialog
        hidden={false}
        onDismiss={closeDialog}
        className="sql-dialog"
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: '选择SQL',
        }}
        modalProps={{
          isBlocking: true,
        }}
      >
        <div style={{ width: width * 0.6, height: mainHeight * 0.7 }}>
          {isShow ?
            <MessageBar
              messageBarType={MessageBarType.error}
              onDismiss={() => this.setState({isShow: false})}
              isMultiline={false}
              dismissButtonAriaLabel="Close"
            >
            未选择SQL，请先选择SQL
          </MessageBar> : null
          }
          <div style={{ width: 200 }}>
            <SearchBox
              placeholder="搜索"
              underlined={true}
              value={name}
              onChange={this._nameChange}
            />
          </div>
          <div style={{ height: mainHeight * 0.7 - 60, overflowY: 'auto' }}>
            <DetailsList
              items={items}
              columns={this._columns}
              onRenderItemColumn={this._onRenderItemColumn}
              setKey="set"
              layoutMode={DetailsListLayoutMode.justified}
              selectionMode={SelectionMode.single}
              selection={this._selection}
              selectionPreservedOnEmptyClick={true}
            />
          </div>
          <Pagination size="small" className="page" total={100}/>
        </div>
        <DialogFooter>
          <PrimaryButton onClick={this._submit} text="确定" />
          <DefaultButton onClick={closeDialog} text="取消" />
        </DialogFooter>
      </Dialog>
    )
  }
}
