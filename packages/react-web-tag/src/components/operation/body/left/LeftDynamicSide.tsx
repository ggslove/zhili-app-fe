import { observer } from "mobx-react";
import React from "react";
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Pagination } from '@uifabric/experiments';
import { Operation } from "src/store";
import LeftDynamicItem from './LeftDynamicItem';
import { sideTypes } from "src/constants/operationConstants";

interface IProps {
  operation: Operation,
}

@observer
export default class LeftDynamicSide extends  React.Component<IProps> {

  render() {
    const { operation } = this.props;
    const { leftMap, changeLeftMapName } = operation;
    const { name, data, pagination } = leftMap[sideTypes.dynamic];
    return (
      <div className="left-body">
        <SearchBox
          placeholder="搜索"
          underlined={true}
          value={name}
          onChange={(e, newValue) => changeLeftMapName(newValue || '', sideTypes.dynamic)}
        />
        <div className="left-dynamic-content">
          {data.map((item: any, index: number) => {
            return <LeftDynamicItem key={item} operation={operation} item={item}/>
          })}
        </div>
        <Pagination pageCount={Math.ceil(pagination.total / pagination.pageSize)}
                    itemsPerPage={pagination.pageSize}
                    totalItemCount={pagination.total} />
      </div>
    );
  }
}
