import { observer } from "mobx-react";
import React from "react";
import { Grid, Row, Col } from 'react-flexbox-grid';
import { DatePicker, DayOfWeek, TextField } from 'office-ui-fabric-react';
import { Dropdown } from 'office-ui-fabric-react/lib/Dropdown';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Build } from "src/store";
import { IRowConfig } from "src//models/build";
import { inputTypes, textAligns, alignOptions, typeOptions } from "src/constants/commonConstants";
import { onFormatDate, onParseDateFromString, DayPickerStrings, turnToDate } from "src/util/build";

interface IProps {
  build: Build;
  width: number;
  rowConfig: IRowConfig;
  colNumChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  fontSizeChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  colorChange: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
}

const controlClass = mergeStyleSets({
  control: {
    margin: '0 0 15px 0',
    maxWidth: '300px'
  }
});

@observer
export default class DateConfig extends  React.Component<IProps> {

  private _onSelectDate = (date: Date | null | undefined): void => {
    const { build } = this.props;
    const { changeConfigDefaultValue } = build;
    if (date) {
      changeConfigDefaultValue(onFormatDate(date));
    }
  };

  private _onSelectMaxDate = (date: Date | null | undefined): void => {
    const { build } = this.props;
    const { changeConfigMax } = build;
    if (date) {
      changeConfigMax(onFormatDate(date));
    }
  };

  private _onSelectMinDate = (date: Date | null | undefined): void => {
    const { build } = this.props;
    const { changeConfigMin } = build;
    if (date) {
      changeConfigMin(onFormatDate(date));
    }
  };

  render() {
    const { build, width, colNumChange, fontSizeChange, colorChange, rowConfig } = this.props;
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
                <DatePicker
                  className={controlClass.control}
                  isRequired={false}
                  allowTextInput={true}
                  firstDayOfWeek={DayOfWeek.Sunday}
                  maxDate={turnToDate(rowConfig.maxValue as string)}
                  minDate={turnToDate(rowConfig.minValue as string)}
                  strings={DayPickerStrings}
                  value={(turnToDate(rowConfig.defaultValue as string))!}
                  onSelectDate={this._onSelectDate}
                  formatDate={onFormatDate}
                  parseDateFromString={e => onParseDateFromString(e, turnToDate(rowConfig.defaultValue as string))}
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
          <Col md={colNum} className="config-col">
            <Row>
              <Col md={4} className="label">
                限定最小:
              </Col>
              <Col md={8}>
                <DatePicker
                  className={controlClass.control}
                  isRequired={false}
                  allowTextInput={true}
                  firstDayOfWeek={DayOfWeek.Sunday}
                  maxDate={turnToDate(rowConfig.maxValue as string)}
                  strings={DayPickerStrings}
                  value={turnToDate(rowConfig.minValue as string)!}
                  onSelectDate={this._onSelectMinDate}
                  formatDate={onFormatDate}
                  parseDateFromString={e => onParseDateFromString(e, turnToDate(rowConfig.minValue as string))}
                />
              </Col>
            </Row>
          </Col>
          <Col md={colNum} className="config-col">
            <Row>
              <Col md={4} className="label">
                限定最大:
              </Col>
              <Col md={8}>
                <DatePicker
                  className={controlClass.control}
                  isRequired={false}
                  allowTextInput={true}
                  firstDayOfWeek={DayOfWeek.Sunday}
                  minDate={turnToDate(rowConfig.minValue as string)}
                  strings={DayPickerStrings}
                  value={turnToDate(rowConfig.maxValue as string)!}
                  onSelectDate={this._onSelectMaxDate}
                  formatDate={onFormatDate}
                  parseDateFromString={e => onParseDateFromString(e, turnToDate(rowConfig.maxValue as string))}
                />
              </Col>
            </Row>
          </Col>
        </Row>
      </Grid>
    );
  }
}
