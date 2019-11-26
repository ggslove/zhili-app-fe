import { observer } from "mobx-react";
import React from "react";
import { Dropdown } from 'office-ui-fabric-react';
import { Build } from "src/store";
import { IRowConfig } from "src/models/build";
import { showOptions } from "src/util/build";

interface IProps {
  build: Build,
  rowConfig: IRowConfig,
}

@observer
export default class SelectShow extends  React.Component<IProps> {
  render() {
    const { rowConfig } = this.props;
    const { defaultValue, color, fontSize, textAlign, options } = rowConfig;
    return (
      <div style={{ color, fontSize, textAlign }}>
        <Dropdown
          options={showOptions(options)}
          selectedKey={defaultValue as string | number}
        />
      </div>
    );
  }
}
