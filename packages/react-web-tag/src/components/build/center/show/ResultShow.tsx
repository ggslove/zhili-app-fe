import { observer } from "mobx-react";
import React from "react";
import { Build } from "src/store";
import { IRowConfig } from "src/models/build";
import { inputTypes } from "src/constants/commonConstants";
import LabelShow from './LabelShow';
import InputShow from "./InputShow";
import SelectShow from "./SelectShow";
import InputNumberShow from "./InputNumberShow";
import DateShow from "./DateShow";
interface IProps {
  build: Build,
  rowConfig: IRowConfig,
}

@observer
export default class ResultShow extends  React.Component<IProps> {
  render() {
    const { rowConfig, build } = this.props;
    switch (rowConfig.type) {
      case inputTypes.label:
        return <LabelShow build={build} rowConfig={rowConfig}/>;
      case inputTypes.input:
        return <InputShow build={build} rowConfig={rowConfig}/>;
      case inputTypes.select:
        return <SelectShow build={build} rowConfig={rowConfig}/>;
      case inputTypes.inputNumber:
        return <InputNumberShow build={build} rowConfig={rowConfig}/>;
      case inputTypes.date:
        return <DateShow build={build} rowConfig={rowConfig}/>;
      default:
        return null;
    }
  }
}
