import { observer } from "mobx-react";
import React from "react";
import TagItem from './TagItem';
import { Operation } from "src/store";
import { IGraphValue, ITagValue } from "src/models/operation";
import { operator, operatorDomMap } from "src/constants/operationConstants";
import InJect from "src/util/InJect";
import { dragRel, dragName, dragIcon, dragType } from 'src/constants/operationConstants';
interface IProps {
  operation: Operation,
  width: number,
}

@observer
export default class BoardCenter extends  React.Component<IProps> {

  _onDrop = (e: any) => {
    const rel = e.dataTransfer.getData(dragRel);
    const name = e.dataTransfer.getData(dragName);
    const icon = e.dataTransfer.getData(dragIcon);
    const type = e.dataTransfer.getData(dragType);
    const { dragOverToBoard } = this.props.operation;
    dragOverToBoard({ name, rel, icon, type });
  };

  render() {
    const { operation, width } = this.props;
    const { boardHeight, graphMap, activeGraphId } = this.props.operation;
    const graph: IGraphValue | null = activeGraphId ? graphMap[activeGraphId] : null;
    if (graph) {
      const { activeVId, vIds, tagMap } = graph;
      return (
        <div
          className="board-center"
          style={{ height: boardHeight - 48, width: width - 40 }}
          onDragOver={(e)=>{e.preventDefault();}}
          onDrop={this._onDrop}
        >
          { vIds.map((vId: string, index: number) => {
            const tag: ITagValue | operator = tagMap[vId];
            const prevVId = vIds[index - 1];
            const prevTag = prevVId ? tagMap[prevVId] : undefined;
            let isNon = false;
            if (prevTag) {
              if (typeof prevTag === 'number'  && prevTag === operator.NON) {
                isNon = true;
              }
            }
            if (tag.hasOwnProperty("name")) {
              return <TagItem operation={ operation } width={ width } tag={ tag as ITagValue } activeVId={ activeVId }
                              vId={ vId } key={ vId } isNon={ isNon } prevVId={ prevVId } />
            } else {
              const Dom = operatorDomMap[tag as operator];
              return <InJect key={ vId } Component={ Dom } props={ { operation, width, activeVId, vId, operator: tag } }/>
            }
          })}
        </div>
      )
    }
    return null;
  }
}
