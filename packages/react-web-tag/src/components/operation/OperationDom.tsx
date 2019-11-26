import { inject, observer } from "mobx-react";
import React from "react";
import { ProgressIndicator } from 'office-ui-fabric-react/lib/ProgressIndicator';
import { System, Operation } from "src/store";
import Toolbar from './toolbar/Toolbar';
import Body from './body/Body';

interface IProps {
  system: System,
  operation: Operation,
}

@inject('system', 'operation')
@observer
export default class OperationDom extends  React.Component<IProps> {
  render() {
    const { operation, system } = this.props;
    return <div className='operation' >
      <Toolbar operation={operation}/>
      <ProgressIndicator />
      <Body operation={operation} system={system}/>
    </div>
  }
}
