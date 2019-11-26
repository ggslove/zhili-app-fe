import { observer } from "mobx-react";
import React from "react";
import { Stack, PrimaryButton } from 'office-ui-fabric-react';
import { Sql, System } from "src/store";
import SqlList from './SqlList';
import { tagTypes } from "src/constants/commonConstants";

interface IProps {
  system: System,
  sql: Sql,
}

@observer
export default class LeftSql extends  React.Component<IProps> {

  render() {
    const { leftWidth } = this.props.sql;
    return (
      <div className="left-sql" style={{ width: leftWidth - 20 }}>
        <Stack>
          <SqlList {...this.props} />
          <PrimaryButton text="新建Sql" />
        </Stack>
      </div>
    )
  }
}
