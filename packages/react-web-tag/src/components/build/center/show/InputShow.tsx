import { observer } from "mobx-react";
import React from "react";
import { TextField } from 'office-ui-fabric-react';
import { Build } from "src/store";
import { IRowConfig } from "src/models/build";

interface IProps {
  build: Build,
  rowConfig: IRowConfig,
}

@observer
export default class InputShow extends  React.Component<IProps> {
  render() {
    const { rowConfig } = this.props;
    const { defaultValue, color, fontSize, textAlign } = rowConfig;
    return (
      <div style={{ color, fontSize, textAlign }}>
        <TextField value={`${defaultValue}`}/>
      </div>
    );
  }
}
