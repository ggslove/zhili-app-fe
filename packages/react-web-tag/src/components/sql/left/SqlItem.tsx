import { observer } from "mobx-react";
import React from "react";
import classNames from 'classnames';
import { Text, Icon } from "office-ui-fabric-react";
import { Sql } from "src/store";

interface IProps {
  sql: Sql,
  tagName: string,
  index: number,
}

@observer
export default class SqlItem extends  React.Component<IProps> {

  render() {
    const { sql, tagName, index } = this.props;
    const { checkTag, activeSqlId } = sql;
    return (
      <div
        className={classNames("sql-item", {"sql-item-2": index % 2}, {active: activeSqlId === `${index}`})}
        onClick={() => checkTag(`${index}`)}
        title={tagName}
      >
        <Text className="sql-name">{tagName}</Text>
        <Icon iconName="Pinned" />
      </div>
    )
  }
}
