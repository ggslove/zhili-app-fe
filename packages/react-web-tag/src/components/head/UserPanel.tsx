import * as React from 'react';
import { Panel, IPanelProps } from 'office-ui-fabric-react/lib/Panel';
import { Text, PrimaryButton, Image, IIconProps } from 'office-ui-fabric-react';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { useConstCallback } from '@uifabric/react-hooks';
import { panelKeys } from "src/constants/headConstants";
import { User } from "src/store";
import { Card } from "@uifabric/react-cards";

interface IProps {
  activePanel: panelKeys | undefined;
  dismissPanel: () => void;
  user: User;
}
const searchboxStyles = { root: { margin: '5px', height: 'auto', width: '100%' } };
const outIcon: IIconProps = { iconName: 'SignOut' };

const NoticePanel: React.FunctionComponent<IProps> = (props: IProps) => {
  const onRenderNavigationContent: IRenderFunction<IPanelProps> = useConstCallback((props, defaultRender) => (
    <>
      <Text styles={searchboxStyles} variant="xLarge">用户信息</Text>
      {defaultRender!(props)}
    </>
  ));
  const { activePanel, dismissPanel, user } = props;
  const { userInfo } = user;
  const username = userInfo ? userInfo.username : '';
  const name = userInfo ? userInfo.name : '';
  return (
    <Panel
      className="panel-under-head card-full"
      isLightDismiss={true}
      onRenderNavigationContent={onRenderNavigationContent}
      isOpen={panelKeys.USER === activePanel}
      onDismiss={dismissPanel}
      closeButtonAriaLabel="Close"
    >
      <Card horizontal className="user-card">
        <Card.Item fill>
          <Image src="/img/user_head.png" alt="Placeholder image." className='left-img' />
        </Card.Item>
        <Card.Section>
          <div className="user-title white-break" title={name}>
            {name}
          </div>
          <div className="user-description white-break" title={username}>
            {username}
          </div>
          <PrimaryButton text='退出' iconProps={outIcon} />
        </Card.Section>
      </Card>
    </Panel>
  )
};

export default NoticePanel;
