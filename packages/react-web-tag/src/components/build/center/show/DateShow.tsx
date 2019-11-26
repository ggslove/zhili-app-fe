import { observer } from "mobx-react";
import React from "react";
import { DatePicker, DayOfWeek } from 'office-ui-fabric-react/lib/DatePicker';
import { mergeStyleSets } from 'office-ui-fabric-react/lib/Styling';
import { Build } from "src/store";
import { IRowConfig } from "src/models/build";
import { onFormatDate, onParseDateFromString, DayPickerStrings, turnToDate } from "src/util/build";

interface IProps {
  build: Build,
  rowConfig: IRowConfig,
}

const controlClass = mergeStyleSets({
  control: {
    margin: '0 0 15px 0',
    maxWidth: '300px'
  }
});

@observer
export default class DateShow extends  React.Component<IProps> {

  render() {
    const { rowConfig } = this.props;
    const { defaultValue, color, fontSize, textAlign } = rowConfig;
    return (
      <div style={{ color, fontSize, textAlign }}>
        <DatePicker
          className={controlClass.control}
          isRequired={false}
          allowTextInput={true}
          firstDayOfWeek={DayOfWeek.Sunday}
          strings={DayPickerStrings}
          value={(turnToDate(defaultValue as string))!}
          formatDate={onFormatDate}
          parseDateFromString={e => onParseDateFromString(e, turnToDate(defaultValue as string))}
        />
      </div>
    );
  }
}
