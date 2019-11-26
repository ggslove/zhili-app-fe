import { observer } from "mobx-react";
import React from "react";
import { TextField } from 'office-ui-fabric-react';
import { IConfig } from "src/models/operation";

interface IProps {
  rowConfig: IConfig,
  changeOperationConfig: (config: IConfig) => void,
}

@observer
export default class InputConfig extends  React.Component<IProps> {
  private _inputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const { rowConfig, changeOperationConfig } = this.props;
    const newConfig: IConfig = { ...rowConfig, value: newValue || '' };
    changeOperationConfig(newConfig);
  };

  render() {
    const { rowConfig } = this.props;
    const { value, color, fontSize, textAlign } = rowConfig;
    return (
      <div style={{ color, fontSize, textAlign }}>
        <TextField value={`${value}`} onChange={this._inputChange}/>
      </div>
    );
  }
}
