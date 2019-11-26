import { Sql, System } from "src/store";
import { observer } from "mobx-react";
import React from "react";
import { Tag } from "antd";
import { Text } from "office-ui-fabric-react";

interface IProps {
  system: System,
  sql: Sql,
}

@observer
export default class WhereSql extends  React.Component<IProps> {
  render() {
    const { whereCols } = this.props.sql;
    return (
      <div className="where-sql">
        <div className="panel-title">
          <Text variant="medium" className="font600">
            条件字段
          </Text>
          <div className="where-cols">
            {whereCols.map((col: any, index: number) => {
              return <Tag key={index} title={col.column} className="col-item">{col.column}</Tag>
            })}
          </div>
        </div>
      </div>
    )
  }
}
