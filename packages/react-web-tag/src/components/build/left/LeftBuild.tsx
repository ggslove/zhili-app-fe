import { observer } from "mobx-react";
import React from "react";
import { Stack, PrimaryButton } from 'office-ui-fabric-react';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { Build, System } from "src/store";
import TagList from './TagList';
import { tagTypes } from "src/constants/commonConstants";

interface IProps {
  system: System,
  build: Build,
}

@observer
export default class LeftBuild extends  React.Component<IProps> {

  render() {
    const { leftWidth } = this.props.build;
    return (
      <div className="left-build" style={{ width: leftWidth - 20 }}>
        <Stack>
          <Pivot>
            <PivotItem headerText="人员">
              <TagList {...this.props} tagType={tagTypes.people} />
            </PivotItem>
            <PivotItem headerText="车辆">
              <TagList {...this.props} tagType={tagTypes.car} />
            </PivotItem>
            <PivotItem headerText="公司">
              <TagList {...this.props} tagType={tagTypes.company} />
            </PivotItem>
            <PivotItem headerText="案件">
              <TagList {...this.props} tagType={tagTypes.case} />
            </PivotItem>
            <PivotItem headerText="其他">
              <TagList {...this.props} tagType={tagTypes.other} />
            </PivotItem>
          </Pivot>
          <PrimaryButton text="新建标签" />
        </Stack>
      </div>
    )
  }
}
