import { observer } from "mobx-react";
import React from "react";
import { Build } from "src/store";
import { IRowConfig } from "src/models/build";
import { inputTypes } from "src/constants/commonConstants";
import LabelConfig from './LabelConfig';
import InputConfig from "./InputConfig";
import SelectConfig from './SelectConfig';
import InputNumberConfig from './InputNumberConfig';
import DateConfig from './DateConfig';

interface IProps {
  build: Build;
  width: number;
}

@observer
export default class ResultConfig extends  React.Component<IProps> {

  _colNumChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const { changeConfigColNum } = this.props.build;
    if (newValue) {
      let colNum = newValue as unknown as number;
      if (colNum * 1 > 12) {
        colNum = 12;
      } else if (colNum * 1 < 1) {
        colNum = 1;
      }
      changeConfigColNum(colNum * 1);
    }
  };

  _labelTextChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const { changeConfigLabelText } = this.props.build;
    changeConfigLabelText(newValue || '');
  };

  _fontSizeChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const { changeConfigFontSize } = this.props.build;
    if (newValue) {
      let fontSize = newValue as unknown as number;
      if (fontSize * 1 > 20) {
        fontSize = 20;
      } else if (fontSize * 1 < 10) {
        fontSize = 10;
      }
      changeConfigFontSize(fontSize * 1);
    }
  };

  _colorChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const { changeConfigColor } = this.props.build;
    changeConfigColor(newValue || '');
  };

  _defaultValueChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const { changeConfigDefaultValue } = this.props.build;
    changeConfigDefaultValue(newValue || '');
  };

  _optionsChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const { changeConfigOptions } = this.props.build;
    changeConfigOptions(newValue || '');
  };

  _maxChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const { changeConfigMax } = this.props.build;
    if (newValue) {
      changeConfigMax(newValue || '');
    }
  };

  _minChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    const { changeConfigMin } = this.props.build;
    if (newValue) {
      changeConfigMin(newValue || '');
    }
  };

  render() {
    const { build, width } = this.props;
    const { activeId, rowConfigs } = build;
    if (activeId) {
      const checkedConfig = rowConfigs.filter((rowConfig: IRowConfig) => {
        return rowConfig.rowId === activeId;
      });
      if (checkedConfig.length > 0) {
        switch (checkedConfig[0].type) {
          case inputTypes.label:
            return <LabelConfig
              build={build }
              width={width}
              colNumChange={this._colNumChange}
              colorChange={this._colorChange}
              fontSizeChange={this._fontSizeChange}
              labelTextChange={this._labelTextChange}
              rowConfig={checkedConfig[0]}
            />;
          case inputTypes.input:
            return <InputConfig
              build={build}
              width={width}
              colNumChange={this._colNumChange}
              colorChange={this._colorChange}
              fontSizeChange={this._fontSizeChange}
              defaultValueChange={this._defaultValueChange}
              rowConfig={checkedConfig[0]}
            />;
          case inputTypes.select:
            return <SelectConfig
              build={build}
              width={width}
              colNumChange={this._colNumChange}
              colorChange={this._colorChange}
              fontSizeChange={this._fontSizeChange}
              optionsChange={this._optionsChange}
              rowConfig={checkedConfig[0]}
            />;
          case inputTypes.inputNumber:
            return <InputNumberConfig
              build={build}
              width={width}
              colNumChange={this._colNumChange}
              colorChange={this._colorChange}
              fontSizeChange={this._fontSizeChange}
              defaultValueChange={this._defaultValueChange}
              maxChange={this._maxChange}
              minChange={this._minChange}
              rowConfig={checkedConfig[0]}
            />;
          case inputTypes.date:
            return <DateConfig
              build={build}
              width={width}
              colNumChange={this._colNumChange}
              colorChange={this._colorChange}
              fontSizeChange={this._fontSizeChange}
              rowConfig={checkedConfig[0]}
            />;
          default:
            return null;
        }
      }
      return null;
    }
    return null;
  }
}
