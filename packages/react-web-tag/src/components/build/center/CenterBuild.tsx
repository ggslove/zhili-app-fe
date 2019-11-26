import { observer } from "mobx-react";
import React from "react";
import { Label, Text, Icon } from 'office-ui-fabric-react';
import { Grid, Row, Col } from 'react-flexbox-grid';
import classNames from 'classnames';
import { Build, System } from "src/store";
import { IRowConfig } from "src/models/build";
import ResultShow from './show/ResultShow';
import ResultConfig from './config/ResultConfig';
import { rightTypes } from "src/constants/operationConstants";

interface IProps {
  system: System,
  build: Build,
}

@observer
export default class CenterBuild extends  React.Component<IProps> {

  render() {
    const { system, build } = this.props;
    const { leftWidth, rightWidth, rowConfigs, addRowConfig, delRowConfig, activeId, checkActiveId } = build;
    const { width, mainHeight } = system;
    return (
      <div className="center-build" style={{ width: width - leftWidth - rightWidth - 2 }}>
        <div className="title">
          <Label>
            <Text variant="large" className="font600 letter">参数配置</Text>
          </Label>
        </div>
        <div style={{ height: mainHeight - 40 }}>
          <div className="show-result">
            <div className="result show-board">
              <Grid fluid>
                <Row>
                  {rowConfigs.map((rowConfig: IRowConfig) => {
                    return (
                      <Col
                        md={rowConfig.colNum}
                        className={classNames("col", { active: rowConfig.rowId === activeId })}
                        key={rowConfig.rowId}
                        onClick={() => checkActiveId(rowConfig.rowId)}
                      >
                        <ResultShow build={build} rowConfig={rowConfig}/>
                      </Col>
                    )
                  })}
                </Row>
              </Grid>
            </div>
            <div className="right-bar">
              <div className="action-bar primary" title="添加" onClick={addRowConfig}>
                <Icon iconName="Add" />
              </div>
              <div
                className={classNames("action-bar close", { disable: !activeId })}
                title="删除">
                <Icon iconName="Clear" onClick={delRowConfig} />
              </div>
            </div>
          </div>
          <div className="show-config">
            <ResultConfig width={width - leftWidth - rightWidth - 2} build={build}  />
          </div>
        </div>
      </div>
    )
  }
}
