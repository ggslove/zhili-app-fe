import { observer } from "mobx-react";
import React from "react";
import { Label, Text } from 'office-ui-fabric-react';
import { Sql, System } from "src/store";
import SqlEdit from './SqlEdit';
import SelectSql from './SelectSql';
import WhereSql from './WhereSql';

interface IProps {
  system: System,
  sql: Sql,
}

@observer
export default class CenterSql extends  React.Component<IProps> {

  render() {
    const { system, sql } = this.props;
    const { leftWidth, rightWidth } = sql;
    const { width, mainHeight } = system;
    return (
      <div className="center-sql" style={{ width: width - leftWidth - rightWidth - 2 }}>
        <div className="title">
          <Label>
            <Text variant="large" className="font600 letter">SQL逻辑</Text>
          </Label>
        </div>
        <div style={{ height: mainHeight - 40 }}>
          <div className="sql-edit">
            <SqlEdit {...this.props} width={width - leftWidth - rightWidth - 2} height={(mainHeight - 40) * 0.4 }/>
          </div>
          <div className="sql-pick">
            <SelectSql {...this.props}/>
            <WhereSql {...this.props}/>
          </div>
        </div>
      </div>
    )
  }
}
