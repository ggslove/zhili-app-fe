import * as React from "react";
export type Props = { text: string };

export default class ExampleComponent extends React.Component<Props>{
  render(){
    console.log("zzzz")
    return (<div> zzzz</div>);
  }
}