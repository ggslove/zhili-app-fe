import { observer } from "mobx-react";
import React from "react";
import { Dropdown } from 'office-ui-fabric-react';
import { IConfig } from "src/models/operation";
import { showOptions } from "src/util/build";

interface IProps {
  rowConfig: IConfig,
  changeOperationConfig: (config: IConfig) => void,
}

@observer
export default class SelectConfig extends  React.Component<IProps> {

  private _selectChange = (newValue: string) => {
    const { rowConfig, changeOperationConfig } = this.props;
    const newConfig: IConfig = { ...rowConfig, value: newValue || '' };
    changeOperationConfig(newConfig);
  };

  render() {
    const { rowConfig } = this.props;
    const { value, color, fontSize, textAlign, options } = rowConfig;
    return (
      <div style={{ color, fontSize, textAlign }}>
        <Dropdown
          options={showOptions(options)}
          selectedKey={value as string | number}
          onChange={(event, item) => item ? this._selectChange(item.key as string) : null}
        />
      </div>
    );
  }
}
