import { observer } from "mobx-react";
import React from "react";
import { Sql, System } from "src/store";
import { SearchBox } from "office-ui-fabric-react";
import { Pagination } from '@uifabric/experiments';
import SqlItem from './SqlItem';

interface IProps {
  system: System,
  sql: Sql,
}

@observer
export default class SqlList extends  React.Component<IProps> {

  render() {
    const { system, sql } = this.props;
    const { sqlList, pagination, name, changeName } = sql;
    const { mainHeight } = system;
    return (
      <div style={{ height: mainHeight - 52 }} className="sql-list">
        <SearchBox
          placeholder="搜索"
          underlined={true}
          value={name}
          onChange={(e, newValue) => changeName(newValue || '') }
        />
        <div className="sqls">
          {sqlList.map((tag: string, index: number) => {
            return <SqlItem sql={ sql } tagName={tag} key={index} index={index}/>;
          })}
        </div>
        <Pagination pageCount={Math.ceil(pagination.total / pagination.pageSize)}
                    itemsPerPage={pagination.pageSize}
                    totalItemCount={pagination.total} />
      </div>
    )
  }
}
