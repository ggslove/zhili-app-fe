import { observer } from "mobx-react";
import React from "react";
import { Grid, Row, Col } from 'react-flexbox-grid';
import { TextField } from 'office-ui-fabric-react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { Build } from "src/store";
import { IRowConfig } from "src/models/build";
import { inputTypes, textAligns, alignOptions, typeOptions } from "src/constants/commonConstants";
import { showOptions } from "src/util/build";

interface IProps {
  build: Build;
  width: number;
  rowConfig: IRowConfig;
  colNumChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  fontSizeChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  colorChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  optionsChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
}


@observer
export default class SelectConfig extends  React.Component<IProps> {

  render() {
    const { build, width, colNumChange, fontSizeChange, colorChange, rowConfig, optionsChange } = this.props;
    const { changeConfigType, changeConfigAlign, changeConfigDefaultValue } = build;
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
                <Dropdown
                  options={showOptions(rowConfig.options)}
                  selectedKey={rowConfig.defaultValue as string | number}
                  onChange={(event, item) => item ? changeConfigDefaultValue(item.key as string) : null}
                />
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
          <Col md={12} className="config-col">
            <Row>
              <Col md={2} className="label">
                下拉参数:
              </Col>
              <Col md={10}>
                <TextField
                  multiline
                  rows={5}
                  placeholder='{key,text}的数组形式，例如:[{ "key": "1", "text": "男", "key": "2", "text": "女" }]'
                  value={rowConfig.options}
                  onChange={optionsChange}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}
