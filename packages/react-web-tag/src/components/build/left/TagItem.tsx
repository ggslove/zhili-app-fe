import { observer } from "mobx-react";
import React from "react";
import classNames from 'classnames';
import { Text, Icon } from "office-ui-fabric-react";
import { Build } from "src/store";
import { tagTypes } from "src/constants/commonConstants";

interface IProps {
  build: Build,
  tagName: string,
  tagType: tagTypes,
  index: number,
}

@observer
export default class TagItem extends  React.Component<IProps> {

  render() {
    const { build, tagName, index } = this.props;
    const { checkTag, activeTagId } = build;
    return (
      <div
        className={classNames("tag-item", {"tag-item-2": index % 2}, {active: activeTagId === `${index}`})}
        onClick={() => checkTag(`${index}`)}
        title={tagName}
      >
        <Text className="tag-name">{tagName}</Text>
        <Icon iconName="Pinned" />
      </div>
    )
  }
}
