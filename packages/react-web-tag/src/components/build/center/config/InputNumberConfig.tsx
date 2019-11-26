import { observer } from "mobx-react";
import React from "react";
import { Grid, Row, Col } from 'react-flexbox-grid';
import { TextField } from 'office-ui-fabric-react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Build } from "src/store";
import { IRowConfig } from "src/models/build";
import { inputTypes, textAligns, alignOptions, typeOptions } from "src/constants/commonConstants";

interface IProps {
  build: Build;
  width: number;
  rowConfig: IRowConfig;
  colNumChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  defaultValueChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  fontSizeChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  colorChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  maxChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  minChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
}


@observer
export default class InputNumberConfig extends  React.Component<IProps> {

  private _inputBlur = () => {
    const { rowConfig, build } = this.props;
    const { maxValue, minValue, defaultValue } = rowConfig;
    const { changeConfigDefaultValue } = build;
    if (maxValue && defaultValue && (defaultValue as number) * 1 > (maxValue as number) * 1) {
      changeConfigDefaultValue(maxValue || '');
    }
    if (minValue && defaultValue && (defaultValue as number) * 1 < (minValue as number) * 1) {
      changeConfigDefaultValue(minValue || '');
    }
  };

  private _maxBlur = () => {
    const { rowConfig, build } = this.props;
    const { maxValue, minValue } = rowConfig;
    const { changeConfigMax } = build;
    if (minValue && maxValue && (minValue as number) * 1 > (maxValue as number) * 1) {
      changeConfigMax(minValue || '');
    }
  };

  private _minBlur = () => {
    const { rowConfig, build } = this.props;
    const { maxValue, minValue } = rowConfig;
    const { changeConfigMin } = build;
    if (minValue && maxValue && (minValue as number) * 1 > (maxValue as number) * 1) {
      changeConfigMin(maxValue || '');
    }
  };

  render() {
    const { build, width, colNumChange, defaultValueChange, fontSizeChange, colorChange, rowConfig, maxChange, minChange } = this.props;
    const { changeConfigType, changeConfigAlign } = build;
    let colNum = 6;
    if (width < 400) {
      colNum = 12
    }
    return (
      <Grid fluid>
        <Row>
          <Col md={colNum} className="config-col">
            <Row>
              <Col md={4} className="label">
                类型:
              </Col>
              <Col md={8}>
                <Dropdown
                  options={typeOptions}
                  selectedKey={rowConfig.type}
                  onChange={(event, item) => item ? changeConfigType(item.key as inputTypes) : null}
                />
              </Col>
            </Row>
          </Col>
          <Col md={colNum} className="config-col">
            <Row>
              <Col md={4} className="label">
                栅格宽度:
              </Col>
              <Col md={8}>
                <TextField type="number" onChange={colNumChange} value={`${rowConfig.colNum}`}/>
              </Col>
            </Row>
          </Col>
          <Col md={colNum} className="config-col">
            <Row>
              <Col md={4} className="label">
                默认值:
              </Col>
              <Col md={8}>
                <TextField value={`${rowConfig.defaultValue}`} onChange={defaultValueChange} type="number" onBlur={this._inputBlur}/>
              </Col>
            </Row>
          </Col>
          <Col md={colNum} className="config-col">
            <Row>
              <Col md={4} className="label">
                字体大小:
              </Col>
              <Col md={8}>
                <TextField type="number" suffix="px" value={`${rowConfig.fontSize}`} onChange={fontSizeChange} />
              </Col>
            </Row>
          </Col>
          <Col md={colNum} className="config-col">
            <Row>
              <Col md={4} className="label">
                颜色:
              </Col>
              <Col md={8}>
                <TextField value={`${rowConfig.color}`} onChange={colorChange} />
              </Col>
            </Row>
          </Col>
          <Col md={colNum} className="config-col">
            <Row>
              <Col md={4} className="label">
                定位:
              </Col>
              <Col md={8}>
                <Dropdown
                  options={alignOptions}
                  selectedKey={rowConfig.textAlign}
                  onChange={(event, item) => item ? changeConfigAlign(item.key as textAligns) : null}
                />
              </Col>
            </Row>
          </Col>
          <Col md={colNum} className="config-col">
            <Row>
              <Col md={4} className="label">
                限定最小:
              </Col>
              <Col md={8}>
                <TextField value={`${rowConfig.minValue}`} onChange={minChange} type="number" onBlur={this._minBlur}  />
              </Col>
            </Row>
          </Col>
          <Col md={colNum} className="config-col">
            <Row>
              <Col md={4} className="label">
                限定最大:
              </Col>
              <Col md={8}>
                <TextField value={`${rowConfig.maxValue}`} onChange={maxChange} type="number" onBlur={this._maxBlur}/>
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}
