import { observer } from "mobx-react";
import React from "react";
import { TextField, Stack, PrimaryButton, DefaultButton, Label, Icon, Text } from 'office-ui-fabric-react';
import { ChoiceGroup, IChoiceGroupOption } from 'office-ui-fabric-react/lib/ChoiceGroup';
import { Build, System } from "src/store";
import { tagTypes, tagTypeList } from 'src/constants/commonConstants';
import SqlDialog from './SqlDialog';

interface IProps {
  system: System,
  build: Build,
}

interface IState {
  isShow: boolean;
}

const sql = "SELECT TABLE_SCHEMA as tableSchema,TABLE_NAME as tableName,TABLE_COMMENT as tableComment FROM INFORMATION_SCHEMA.TABLES WHERE TABLE_TYPE='base table' and table_name = '123';";
@observer
export default class RightBuild extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { isShow: false };
  }

  _closeDialog = () => {
    this.setState({ isShow: false });
  };

  _onTypeChange = (ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) => {
    if (option) {
      const { changeBasicInfo, basicInfo } = this.props.build;
      changeBasicInfo({ ...basicInfo, type: option.key as tagTypes });
    }
  };

  render() {
    const { system, build } = this.props;
    const { leftWidth, changeBasicInfo, basicInfo } = build;
    const { isShow } = this.state;
    const { name, type } = basicInfo;
    return (
      <div className="right-build" style={{ width: leftWidth - 40 }}>
        <Stack>
          <TextField
            label="标签名"
            required
            errorMessage={ name ? '' : '标签名不可为空' }
            onChange={(e: any, newValue?: string) => changeBasicInfo({ ...basicInfo, name: newValue || '' })}
            value={name}
          />
          <ChoiceGroup
            required
            label="类型"
            selectedKey={type}
            options={tagTypeList.map(({code, text}: { code: tagTypes, text: string }) => (
              {
                key: code,
                imageSrc: `/img/${code}.png`,
                selectedImageSrc: `/img/${code}.png`,
                imageSize: { width: 32, height: 32 },
                text: text,
              }
            ))}
            onChange={this._onTypeChange}
          />
          <Label className="sql-link" title="选择SQL" onClick={() => this.setState({ isShow: true })}>
            <Text variant="medium" className="font600 sql">SQL</Text>
            <Icon iconName="PageLink" />
          </Label>
          <div className="sql-review" onClick={() => this.setState({ isShow: true })}>
            {sql}
          </div>
        </Stack>
        <div className="button-group">
          <PrimaryButton text="保存" className="submit-button"/>
          <DefaultButton text="删除" className="delete-button"/>
        </div>
        {isShow ? <SqlDialog closeDialog={this._closeDialog} system={system} /> : null }
      </div>
    )
  }
}
