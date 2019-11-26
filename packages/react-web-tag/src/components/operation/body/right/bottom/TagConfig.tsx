import { observer } from "mobx-react";
import { Col, Grid, Row } from "react-flexbox-grid";
import React from "react";
import { rightTypes } from "src/constants/operationConstants";
import { IConfig } from "src/models/operation";
import { Operation } from "src/store";
import Config from "./config/Config";

interface IProps {
  operation: Operation,
  width: number,
  configs: IConfig[] | null,
  vId: string,
  rightType: rightTypes | null,
}

@observer
export default class TagConfig extends  React.Component<IProps> {

  render() {
    const { rightType, configs, operation, width } = this.props;
    let colSize: number = 1;
    if (rightType || width < 400) {
      colSize = 2;
    }
    if (configs) {
      return (
        <div className="tag-config" style={{ width: rightType ? 'calc(50% - 1px)' : 'calc(100% - 1px)' }}>
          <Grid fluid>
            <Row>
              {configs.map((config: IConfig) => {
                return (
                  <Col
                    md={config.colNum * colSize}
                    className="col"
                    key={config.rowId}
                  >
                    <Config  rowConfig={config} operation={operation} />
                  </Col>
                )
              })}
            </Row>
          </Grid>
        </div>
      )
    }
    return (
      <div className="tag-config" style={{ width: rightType ? 'calc(50% - 1px)' : 'calc(100% - 1px)' }} />
    )
  }
}
