import { observer } from "mobx-react";
import React from "react";
import { IConfig } from "src/models/operation";

interface IProps {
  rowConfig: IConfig,
}

@observer
export default class LabelConfig extends  React.Component<IProps> {
  render() {
    const { rowConfig } = this.props;
    const { labelText, color, fontSize, textAlign } = rowConfig;
    return (
      <div title={labelText} style={{ color, fontSize, textAlign }} className="label">
        {labelText}
      </div>
    );
  }
}
