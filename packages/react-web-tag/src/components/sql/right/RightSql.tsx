import { observer } from "mobx-react";
import React from "react";
import { TextField, Stack, PrimaryButton, DefaultButton,Dropdown } from 'office-ui-fabric-react';
import { Sql, System } from "src/store";
import { ISelectCol } from "src/models/sql";

interface IProps {
  system: System,
  sql: Sql,
}

@observer
export default class RightSql extends  React.Component<IProps> {

  _showOptions = () => {
    const { selectCols } = this.props.sql;
    return selectCols.map((col: ISelectCol) => {
      return { key: col.columnAlias || col.columnName, text: col.columnAlias || col.columnName };
    })
  };

  render() {
    const { leftWidth, changeBasicInfo, basicInfo } = this.props.sql;
    const { name, personCol, unitCol, caseCol, carCol2, carCol1, areaCol } = basicInfo;
    return (
      <div className="right-sql" style={{ width: leftWidth - 40 }}>
        <Stack>
          <TextField
            label="SQL名"
            required
            errorMessage={ name ? '' : 'SQL名不可为空' }
            onChange={(e: any, newValue?: string) => changeBasicInfo({ ...basicInfo, name: newValue || '' })}
            value={name}
          />
          <Dropdown
            label="指定身份证"
            options={this._showOptions()}
            selectedKey={personCol}
            onChange={(event, item) => item ? changeBasicInfo({ ...basicInfo, personCol: item.key as string }) : null}
          />
          <Dropdown
            label="指定车牌号"
            options={this._showOptions()}
            selectedKey={carCol1}
            onChange={(event, item) => item ? changeBasicInfo({ ...basicInfo, carCol1: item.key as string }) : null}
          />
          <Dropdown
            label="指定号牌种类"
            options={this._showOptions()}
            selectedKey={carCol2}
            onChange={(event, item) => item ? changeBasicInfo({ ...basicInfo, carCol2: item.key as string }) : null}
          />
          <Dropdown
            label="指定案件编号"
            options={this._showOptions()}
            selectedKey={caseCol}
            onChange={(event, item) => item ? changeBasicInfo({ ...basicInfo, caseCol: item.key as string }) : null}
          />
          <Dropdown
            label="指定单位名称"
            options={this._showOptions()}
            selectedKey={unitCol}
            onChange={(event, item) => item ? changeBasicInfo({ ...basicInfo, unitCol: item.key as string }) : null}
          />
          <Dropdown
            label="指定行政区划"
            options={this._showOptions()}
            selectedKey={areaCol}
            onChange={(event, item) => item ? changeBasicInfo({ ...basicInfo, areaCol: item.key as string }) : null}
          />
        </Stack>
        <div className="button-group">
          <PrimaryButton text="保存" className="submit-button"/>
          <DefaultButton text="删除" className="delete-button"/>
        </div>
      </div>
    )
  }
}
