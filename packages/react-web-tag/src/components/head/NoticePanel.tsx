import * as React from 'react';
import { Panel, IPanelProps } from 'office-ui-fabric-react/lib/Panel';
import { Text, Link, Icon } from 'office-ui-fabric-react';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { useConstCallback } from '@uifabric/react-hooks';
import { Badge } from 'antd';
import { panelKeys } from "src/constants/headConstants";
import { User } from "src/store";

interface IProps {
  activePanel: panelKeys | undefined;
  dismissPanel: () => void;
  user: User;
  readAll: () => void;
  unReadNum: number;
}
const searchBoxStyles = { root: { margin: '5px', height: 'auto', width: '100%' } };

const NoticePanel: React.FunctionComponent<IProps> = (props: IProps) => {
  const onRenderNavigationContent: IRenderFunction<IPanelProps> = useConstCallback((props, defaultRender) => (
    <>
      <Text styles={searchBoxStyles} variant="xLarge">通知</Text>
      {defaultRender!(props)}
    </>
  ));
  const { activePanel, dismissPanel, readAll, unReadNum } = props;
  return (
    <Panel
      className="panel-under-head"
      isLightDismiss={true}
      isOpen={panelKeys.NOTICE === activePanel}
      onRenderNavigationContent={onRenderNavigationContent}
      onDismiss={dismissPanel}
      closeButtonAriaLabel="Close"
    >
      <Link onClick={readAll}>一键已读</Link>
      <Badge dot={unReadNum > 0}>
        <div className="notice-card">
          <div className="left-img">
            <Icon iconName="Warning" />
          </div>
          <div className="right-content">
            <div><Text variant="medium" className="font600" >预警信息1</Text></div>
            <div className="description"><Text variant="medium">描述</Text></div>
          </div>
        </div>
      </Badge>
      <Badge dot={unReadNum > 0}>
        <div className="notice-card">
          <div className="left-img">
            <Icon iconName="Warning" />
          </div>
          <div className="right-content">
            <Text variant="medium" className="font600" >预警信息2</Text>
          </div>
        </div>
      </Badge>
      <Badge dot={unReadNum > 0}>
        <div className="notice-card">
          <div className="left-img">
            <Icon iconName="Warning" />
          </div>
          <div className="right-content">
            <Text variant="medium" className="font600" >预警信息3</Text>
          </div>
        </div>
      </Badge>
      <Badge dot={unReadNum > 0}>
        <div className="notice-card">
          <div className="left-img">
            <Icon iconName="Warning" />
          </div>
          <div className="right-content">
            <Text variant="medium" className="font600" >预警信息4</Text>
          </div>
        </div>
      </Badge>
      <Badge dot={unReadNum > 0}>
        <div className="notice-card">
          <div className="left-img">
            <Icon iconName="Warning" />
          </div>
          <div className="right-content">
            <Text variant="medium" className="font600" >预警信息5</Text>
          </div>
        </div>
      </Badge>
      <Badge dot={unReadNum > 0}>
        <div className="notice-card">
          <div className="left-img">
            <Icon iconName="Warning" />
          </div>
          <div className="right-content">
            <Text variant="medium" className="font600" >预警信息6</Text>
          </div>
        </div>
      </Badge>
    </Panel>
  )
};

export default NoticePanel;
