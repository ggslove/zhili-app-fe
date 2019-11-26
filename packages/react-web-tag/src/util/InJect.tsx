import React from 'react';

type propTypes = {
  Component: any;
  props?: any;
};
export default class InJect extends  React.Component<propTypes> {
  render() {
    const {  Component, props } =  this.props;
    return <Component { ... props} />;
  }
}

