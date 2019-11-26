import { observer } from "mobx-react";
import React from "react";
import { SearchBox } from 'office-ui-fabric-react/lib/SearchBox';
import { Tag } from 'antd';
import { Pagination } from '@uifabric/experiments';
import { Operation } from "src/store";
import { tagAllTypeList, tagTypes } from 'src/constants/commonConstants';
import LeftDragItem from './LeftDragItem';
import { sideTypes } from "src/constants/operationConstants";

const { CheckableTag } = Tag;

interface IProps {
  operation: Operation,
}

@observer
export default class LeftStaticSide extends  React.Component<IProps> {

  render() {
    const { operation } = this.props;
    const { changeStaticActiveTag, changeStaticName, leftMap } = operation;
    const { name, activeTag, data, pagination } = leftMap[sideTypes.static];
    return (
      <div className="left-body">
        <SearchBox
          placeholder="搜索"
          underlined={true}
          value={name}
          onChange={(e, newValue) => changeStaticName(newValue || '')}
        />
        <div className="left-drag-content">
          {tagAllTypeList.map(({ code, text }: { code: tagTypes, text: string }) => {
            return (
              <CheckableTag
                checked={code === activeTag || activeTag === tagTypes.all}
                onChange={() => changeStaticActiveTag(code)}
                key={code}
              >
                {text}
              </CheckableTag >
            );
          })}
          {data.map((item: any, index: number) => {
            return <LeftDragItem key={index} operation={operation} item={item}/>
          })}
          <Pagination pageCount={Math.ceil(pagination.total / pagination.pageSize)}
                      itemsPerPage={pagination.pageSize}
                      totalItemCount={pagination.total} />
        </div>
      </div>
    );
  }
}
