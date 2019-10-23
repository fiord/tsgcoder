import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as myActions from '../redux/action';
import {
  Form,
  FormGroup,
  Input,
  Label,
  Button
} from 'reactstrap';

const html = require('html');
const marked = require('marked');

class ProblemDetailComponent extends React.Component {
  constructor(props) {
    super(props);
    console.log("check", this.props.match.params);
    this.props.actions.update({problemId: this.props.match.params.id});
    this.loadProblem = this.loadProblem.bind(this);
    this.loadLangs = this.loadLangs.bind(this);
  }

  async loadProblem() {
    return fetch(`/_api/problems/${this.props.match.params.id}`)
      .then(response => {
        return response.json();
      })
      .then(async (response_json) => {
        const mdDat = response_json.problem;
        const htmlDat = html.prettyPrint(marked(mdDat.main, {
          // option
        }));
        console.log("html data:", htmlDat);
        await this.props.actions.update({ problem: {
          title: mdDat.title,
          main: htmlDat,
        }});
      })
      .catch(error => {
        console.error(error);
      });
  }

  async loadLangs() {
    fetch('/code/langs').then(res => res.json())
      .then(res => {
        console.log("langs:", res);
        this.props.actions.update({langs: res.ret});
      });
  }

  componentDidMount() {
    this.loadProblem();
    this.loadLangs();
  }

  render() {
    console.log(this.props.problem);
    if (!this.props.problem) {
      // loadingとか出したいね
      return (<div></div>);
    }
    else {
      return (
        <div>
          <h2>{this.props.problem.title}</h2>
          <div id="problem_main" dangerouslySetInnerHTML={{
            __html: this.props.problem.main
          }}></div>
          <Form action="/problems/submit" method="POST">
            <input type="hidden" name="problemId" value={this.props.match.params.id} />
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
              <Input type="textarea" name="code" id="code" value={this.props.code} onChange={(val) => {this.props.actions.update({code: val.target.value});}} />
            </FormGroup>
            <Button type="submit">Submit</Button>
          </Form>
        </div>
      );
    }
  }
}

const mapStateToProps = (state) => ({
  problemId: state.problemId,
  problem: state.problem,
  code: state.code,
  langs: state.langs,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(myActions, dispatch),
});
const ProblemDetail = connect(mapStateToProps, mapDispatchToProps)(ProblemDetailComponent);
export default  ProblemDetail;
