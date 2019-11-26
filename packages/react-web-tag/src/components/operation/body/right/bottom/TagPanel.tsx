import { observer } from "mobx-react";
import React from "react";
import TagConfig from './TagConfig';
import { Operation } from "src/store";
import { ITagValue } from "src/models/operation";
import RightSiderBar  from "./RightSiderBar";
import TagReview from "./TagReview";

interface IProps {
  operation: Operation,
  vId: string,
  width: number,
  height: number,
  tag: ITagValue,
}


@observer
export default class TagPanel extends  React.Component<IProps> {

  render() {
    const { width, height, operation, vId, tag } = this.props;
    const { rightType, config } = tag;
    return (
      <div style={{ width, height: height - 30 }} className='tag-panel'>
        <div style={{ width: width - 29 }} className="tag-body">
          <TagConfig operation={operation} vId={vId} rightType={rightType} configs={config} width={width} />
          <TagReview operation={operation} vId={vId} rightType={rightType} />
        </div>
        <RightSiderBar operation={operation} vId={vId} height={height - 30} rightType={rightType} />
      </div>
    )
  }
}
