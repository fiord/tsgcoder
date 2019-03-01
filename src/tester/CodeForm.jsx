import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button } from 'reactstrap';
import * as myActions from '../redux/action';

class CodeFormComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props.code);
    return (
      <Form action="/test/test" method="POST">
        <FormGroup>
          <Label for="code">Code</Label>
          <Input type="textarea" name="code" id="code" value={this.props.code} onChange={(val) => {console.log(val.target); this.props.actions.update({code: val.target.value});}} />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({ code: state.code });
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(myActions, dispatch)
});
const CodeForm = connect(mapStateToProps, mapDispatchToProps)(CodeFormComponent);
export default CodeForm;
