import { observer } from "mobx-react";
import React from "react";
import { IConfig } from "src/models/operation";
import { inputTypes } from "src/constants/commonConstants";
import LabelConfig from './LabelConfig';
import InputConfig from "./InputConfig";
import SelectConfig from "./SelectConfig";
import InputNumberConfig from "./InputNumberConfig";
import DateConfig from "./DateConfig";
import Operation from "src/store/operation";

interface IProps {
  rowConfig: IConfig,
  operation: Operation
}

@observer
export default class Config extends  React.Component<IProps> {

  private _changeOperationConfig = (config: IConfig) => {
    const { operation } = this.props;
    const { changeConfig } = operation;
    changeConfig(config);
  };

  render() {
    const { rowConfig } = this.props;
    switch (rowConfig.type) {
      case inputTypes.label:
        return <LabelConfig rowConfig={rowConfig} />;
      case inputTypes.input:
        return <InputConfig rowConfig={rowConfig} changeOperationConfig={this._changeOperationConfig}/>;
      case inputTypes.select:
        return <SelectConfig rowConfig={rowConfig} changeOperationConfig={this._changeOperationConfig}/>;
      case inputTypes.inputNumber:
        return <InputNumberConfig rowConfig={rowConfig} changeOperationConfig={this._changeOperationConfig}/>;
      case inputTypes.date:
        return <DateConfig rowConfig={rowConfig} changeOperationConfig={this._changeOperationConfig}/>;
      default:
        return null;
    }
  }
}
