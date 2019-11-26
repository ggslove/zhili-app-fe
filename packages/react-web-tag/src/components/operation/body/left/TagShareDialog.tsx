import { observer } from "mobx-react";
import React from "react";
import { Label, TextField } from 'office-ui-fabric-react';
import { Row, Col, Grid } from 'react-flexbox-grid';
import { Dialog, DialogType, DialogFooter } from 'office-ui-fabric-react/lib/Dialog';
import { PrimaryButton, DefaultButton } from 'office-ui-fabric-react/lib/Button';
import { Operation } from "src/store";

interface IProps {
  operation: Operation,
  closeDialog: () => void;
  item: any;
}

interface IState {
  reason: string,
}
@observer
export default class TagShareDialog extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { reason: '' };
  }

  private _reasonChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    this.setState({ reason: newValue || '' });
  };

  private _submit = () => {
    const { operation, closeDialog } = this.props;
    const { addGraph } = operation;

  };

  render() {
    const { closeDialog } = this.props;
    const { reason } = this.state;
    return (
      <Dialog
        hidden={false}
        onDismiss={closeDialog}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: '共享标签',
        }}
        modalProps={{
          isBlocking: true,
        }}
      >
        <Grid fluid style={{ width: 320 }}>
          <Row style={{ marginBottom: 5 }}>
            <Col md={3} style={{ textAlign: 'right' }}>
              <Label>共享原因</Label>
            </Col>
            <Col md={9}>
              <TextField multiline rows={3} value={reason} onChange={this._reasonChange} />
            </Col>
          </Row>
        </Grid>
        <DialogFooter>
          <PrimaryButton onClick={this._submit} text="确定" />
          <DefaultButton onClick={closeDialog} text="取消" />
        </DialogFooter>
      </Dialog>
    )
  }
}
