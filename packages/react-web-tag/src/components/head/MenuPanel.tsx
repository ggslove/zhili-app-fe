import * as React from 'react';
import { Panel, IPanelProps, PanelType } from 'office-ui-fabric-react/lib/Panel';
import { CommandBarButton, IIconProps, Label, Text } from 'office-ui-fabric-react';
import { IRenderFunction } from 'office-ui-fabric-react/lib/Utilities';
import { useConstCallback } from '@uifabric/react-hooks';
import classNames from "classnames";
import { panelKeys } from "src/constants/headConstants";
import { User } from "src/store";
import { modelLinks } from "src/constants/commonConstants";
import { IModelLink } from "src/models";

interface IProps {
  activePanel: panelKeys | undefined;
  dismissPanel: () => void;
  user: User;
}

const iconStyles = { root: { margin: '5px', height: 'auto', width: '100%' } };
const menuIcon: IIconProps = { iconName: 'WaffleOffice365' };

const MenuPanel: React.FunctionComponent<IProps> = (props: IProps) => {
  const onRenderNavigationContent: IRenderFunction<IPanelProps> = useConstCallback((navProps, defaultRender) => (
    <>
      <Label styles={iconStyles}>
        <CommandBarButton
          iconProps={menuIcon}
          className={classNames({ active: panelKeys.MENU === activePanel } )}
          title='菜单'
          onClick={props.dismissPanel}
        />
      </Label>

      {defaultRender!(navProps)}
    </>
  ));
  const { activePanel, dismissPanel } = props;
  return (
    <Panel
      className="panel-all-head"
      isLightDismiss={true}
      isOpen={panelKeys.MENU === activePanel}
      onRenderNavigationContent={onRenderNavigationContent}
      onDismiss={dismissPanel}
      hasCloseButton={false}
      type={PanelType.customNear}
    >
      <Label>
        <Text variant="xLarge">
          模块
        </Text>
      </Label>
      <Label>
        {modelLinks.map((modelLink: IModelLink, index: number) => {
          return (
            <div
              className="nav-item"
              title={modelLink.name}
              key={`link${index}`}
              onClick={() => {window.location.href = modelLink.link;dismissPanel()}}
            >
              <img src={modelLink.img} />
              <span>{modelLink.name}</span>
            </div>
          );
        })}
      </Label>
    </Panel>
  )
};

export default MenuPanel;
