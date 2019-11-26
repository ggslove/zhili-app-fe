import { observer } from "mobx-react";
import React from "react";
import { DatePicker, DayOfWeek } from 'office-ui-fabric-react/lib/DatePicker';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { IConfig } from "src/models/operation";
import { onFormatDate, onParseDateFromString, DayPickerStrings, turnToDate } from "src/util/build";

interface IProps {
  rowConfig: IConfig,
  changeOperationConfig: (config: IConfig) => void,
}

const controlClass = mergeStyleSets({
  control: {
    margin: '0 0 15px 0',
    maxWidth: '300px'
  }
});

@observer
export default class DateConfig extends  React.Component<IProps> {

  private _dateChange = (date: Date | null | undefined) => {
    const { rowConfig, changeOperationConfig } = this.props;
    if (date) {
      const newConfig: IConfig = { ...rowConfig, value: onFormatDate(date) };
      changeOperationConfig(newConfig);
    }
  };

  render() {
    const { rowConfig } = this.props;
    const { value, color, fontSize, textAlign, maxValue, minValue } = rowConfig;
    return (
      <div style={{ color, fontSize, textAlign }}>
        <DatePicker
          className={controlClass.control}
          isRequired={false}
          allowTextInput={true}
          firstDayOfWeek={DayOfWeek.Sunday}
          strings={DayPickerStrings}
          value={(turnToDate(value as string))!}
          maxDate={turnToDate((maxValue as string))}
          minDate={turnToDate((minValue as string))}
          formatDate={onFormatDate}
          onSelectDate={this._dateChange}
          parseDateFromString={e => onParseDateFromString(e, turnToDate(value as string))}
        />
      </div>
    );
  }
}
