import { observer } from "mobx-react";
import React from "react";
import { TextField } from 'office-ui-fabric-react';
import { IConfig } from "src/models/operation";

interface IProps {
  rowConfig: IConfig,
  changeOperationConfig: (config: IConfig) => void,
}

@observer
export default class InputNumberConfig extends  React.Component<IProps> {

  private _inputChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const { rowConfig, changeOperationConfig } = this.props;
    const newConfig: IConfig = { ...rowConfig, value: newValue || '' };
    changeOperationConfig(newConfig);
  };

  private _inputBlur = () => {
    const { rowConfig, changeOperationConfig } = this.props;
    const { maxValue, minValue, value } = rowConfig;
    if (maxValue && value && (value as number) * 1 > (maxValue as number) * 1) {
      const newConfig: IConfig = { ...rowConfig, value: maxValue || '' };
      changeOperationConfig(newConfig);
    }
    if (minValue && value && (value as number) * 1 < (minValue as number) * 1) {
      const newConfig: IConfig = { ...rowConfig, value: minValue || '' };
      changeOperationConfig(newConfig);
    }
  };

  render() {
    const { rowConfig } = this.props;
    const { value, color, fontSize, textAlign } = rowConfig;
    return (
      <div style={{ color, fontSize, textAlign }}>
        <TextField value={`${value}`} type="number" onChange={this._inputChange} onBlur={this._inputBlur}/>
      </div>
    );
  }
}
