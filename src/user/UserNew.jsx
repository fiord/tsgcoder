import React from 'react';
import {
  Button,
  Form,
  FormGroup,
  Col,
  Label,
  Input } from 'reactstrap';

class UserNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };

    this.onChangeField = this.onChangeField.bind(this);
  }

  onChangeField(e) {
    var user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({
      user: user
    });
  }

  render() {
    const user = this.state.user || {};
    return (
      <Form action={'/_api/users'} method='post'>
        <input name="_method" type="hidden" value="PUT" readOnly />
        <FormGroup row>
          <Label for="name" sm={2}>Name</Label>
          <Col sm={10}>
            <Input type="name" name="name" id="name" value={user.name} placeholder="Input Your Name" onChange={this.onChangeField} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="twitter" sm={2}>Twitter</Label>
          <Col sm={10}>
            <Input type="name" name="twitter" id="twitter" value={user.twitter} placeholder="Your Twitter Account(ex: @__Hyoga)" onChange={this.onChangeField} />
          </Col>
        </FormGroup>
        <FormGroup row>
          <Label for="note" sm={2}>Note</Label>
          <Col sm={10}>
            <Input type="textarea" name="note" id="note" value={user.note} placeholder="write anything" onChange={this.onChangeField} />
          </Col>
        </FormGroup>
        <Button type="submit">Register</Button>
      </Form>
    );
  }
}

export default UserNew;
