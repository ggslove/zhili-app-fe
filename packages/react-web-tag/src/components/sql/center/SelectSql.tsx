import { observer } from "mobx-react";
import { Text } from 'office-ui-fabric-react';
import React from "react";
import { Tag } from "antd";
import { Sql, System } from "src/store";
import { ISelectCol } from "src/models/sql";

interface IProps {
  system: System,
  sql: Sql,
}

@observer
export default class SelectSql extends  React.Component<IProps> {

  private _showTitle = (col: ISelectCol) => {
    return `字段名:${col.columnName}\n别名:${col.columnAlias}`;
  };

  render() {
    const { selectCols } = this.props.sql;
    return (
      <div className="select-sql">
        <div className="panel-title">
          <Text variant="medium" className="font600">
            输出字段
          </Text>
          <div className="select-cols">
            {selectCols.map((col: ISelectCol, index: number) => {
              return <Tag title={this._showTitle(col)} key={index} className="col-item">{col.columnAlias || col.columnName}</Tag>
            })}
          </div>
        </div>
      </div>
    )
  }
}
