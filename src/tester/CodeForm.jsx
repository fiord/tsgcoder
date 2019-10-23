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
  // eslint-disable-next-line
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    fetch('/code/langs').then(res => res.json())
      .then(res => {
        this.props.actions.update({langs: res.ret});
      })
  }

  render() {
    return (
      <Form action="/test/test" method="POST">
        <FormGroup>
          <Label for="lang">Language</Label>
          <Input type="select" name="lang" id="lang">
            {this.props.langs.map((val) => {
              return (
                <option>{val.name}</option>
              );
            })}
          </Input>
          <Label for="code">Code</Label>
          <Input type="textarea" name="code" id="code" value={this.props.code} onChange={(val) => {console.log(val.target); this.props.actions.update({code: val.target.value});}} />
          <Label for="stdin">Standard Input</Label>
          <Input type="textarea" name="stdin" id="stdin" value={this.props.stdin} onChange={(val) => {this.props.actions.update({stdin: val.target.value});}} />
        </FormGroup>
        <Button type="submit">Submit</Button>
      </Form>
    );
  }
}

const mapStateToProps = (state) => ({
  code: state.code,
  langs: state.langs,
  stdin: state.stdin,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(myActions, dispatch)
});
const CodeForm = connect(mapStateToProps, mapDispatchToProps)(CodeFormComponent);
export default CodeForm;
