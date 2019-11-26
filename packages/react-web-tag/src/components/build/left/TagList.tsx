import { observer } from "mobx-react";
import React from "react";
import { Build, System } from "src/store";
import TagItem from './TagItem';
import { SearchBox } from "office-ui-fabric-react";
import { Pagination } from '@uifabric/experiments';
import { tagTypes } from "src/constants/commonConstants";

interface IProps {
  system: System,
  build: Build,
  tagType: tagTypes,
}

@observer
export default class TagList extends  React.Component<IProps> {

  private _pageChange = (current: number) => {
    const { pageChange } = this.props.build;
    pageChange(current);
  };

  render() {
    const { system, build, tagType } = this.props;
    const { tagList, pagination } = build;
    const { mainHeight } = system;
    return (
      <div style={{ height: mainHeight - 82 }} className="tag-list">
        <SearchBox
          placeholder="搜索"
          underlined={true}
        />
        <div className="tags">
          {tagList.map((tag: string, index: number) => {
            return <TagItem build={ build } tagName={tag} key={index} tagType={tagType} index={index}/>;
          })}
        </div>
        <Pagination pageCount={Math.ceil(pagination.total / pagination.pageSize)}
                    itemsPerPage={pagination.pageSize}
                    totalItemCount={pagination.total}
                    selectedPageIndex={pagination.current}
                    onPageChange={this._pageChange}
        />
      </div>
    )
  }
}
