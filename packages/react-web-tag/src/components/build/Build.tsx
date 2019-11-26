import { inject, observer } from "mobx-react";
import React from "react";
import { System, Build } from "src/store";
import LeftBuild from './left/LeftBuild';
import CenterBuild from './center/CenterBuild';
import RightBuild from './right/RightBuild';
import { Image } from "office-ui-fabric-react";

interface IProps {
  system: System,
  build: Build,
}


@inject('system', 'build')
@observer
export default class BuildDom extends  React.Component<IProps> {
  render() {
    const { system, build } = this.props;
    const { activeTagId } = build;
    const { mainHeight } = system;
    return (
      <div className="build" style={{ height: mainHeight }}>
        <LeftBuild system={system} build={build} />
        {
          activeTagId ?
            <div>
              <CenterBuild system={system} build={build} />
              <RightBuild system={system} build={build} />
            </div>
            :
            <div className="no-data">
              <Image src='/img/no-data1.png'/>
            </div>
        }
      </div>
    )
  }
}
