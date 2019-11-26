import { observer } from "mobx-react";
import React from "react";
import { DetailsList, DetailsListLayoutMode, IColumn, SelectionMode } from "office-ui-fabric-react";
import { Operation } from "src/store";
import { rightTypes } from "src/constants/operationConstants";

interface IProps {
  operation: Operation,
  vId: string,
  rightType: rightTypes | null,
}

interface IDetailsListBasicExampleItem {
  key: number;
  name: string;
  value: number;
}

interface IState {
  isShow: boolean;
  items: IDetailsListBasicExampleItem[];
}

@observer
export default class TagReview extends  React.Component<IProps, IState> {

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
    this.state = { isShow: true,items: _allItems }
  }

  _columns: IColumn[] = [
    { key: 'column1', name: '标签名', fieldName: 'name', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column2', name: '最近操作时间', fieldName: 'value', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column3', name: '最近操作人', fieldName: 'who', minWidth: 100, maxWidth: 200, isResizable: true },
    { key: 'column4', name: '共享', fieldName: 'who', minWidth: 100, maxWidth: 200, isResizable: true }
  ];

  render() {
    const { rightType } = this.props;
    const { items } = this.state;
    return (
      <div style={{ width: rightType === rightTypes.REVIEW ? '50%' : 0 }} className="rag-review">
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
      </div>
    )
  }
}
