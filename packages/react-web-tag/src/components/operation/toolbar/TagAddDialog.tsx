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
  isHidden: boolean;
}

interface IState {
  name: string,
  description: string,
}
@observer
export default class TagAddDialog extends  React.Component<IProps, IState> {

  constructor(props: IProps) {
    super(props);
    this.state = { name: '', description: '' };
  }

  private _nameChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    this.setState({ name: newValue || '' });
  };

  private _descriptionChange = (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => {
    this.setState({ description: newValue || '' });
  };

  private _submit = () => {
    const { operation, closeDialog } = this.props;
    const { addGraph } = operation;
    if (this.state.name) {
      addGraph(this.state);
      closeDialog();
    }
  };

  render() {
    const { closeDialog, isHidden } = this.props;
    const { name, description } = this.state;
    return (
      <Dialog
        hidden={isHidden}
        onDismiss={closeDialog}
        dialogContentProps={{
          type: DialogType.largeHeader,
          title: '新增标签',
        }}
        modalProps={{
          isBlocking: true,
        }}
      >
        <Grid fluid style={{ width: 320 }}>
          <Row style={{ marginBottom: 5 }}>
            <Col md={3} style={{ textAlign: 'right' }}>
              <Label>标签名</Label>
            </Col>
            <Col md={9}>
              <TextField required value={name} onChange={this._nameChange} errorMessage={name ? '' : "标签名不可为空"}  />
            </Col>
          </Row>
          <Row>
            <Col md={3} style={{ textAlign: 'right' }}>
              <Label>描述</Label>
            </Col>
            <Col md={9}>
              <TextField multiline rows={3} value={description} onChange={this._descriptionChange} />
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
