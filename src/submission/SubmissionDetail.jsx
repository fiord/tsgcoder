import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner, Jumbotron, Table, Badge } from 'reactstrap';
import * as myActions from '../redux/action';

class CodeResultComponent extends React.Component {
  constructor(props) {
    super(props);
    this.loadCode = this.loadCode.bind(this);
    this.renderCode = this.renderCode.bind(this);
    this.renderIcon = this.renderIcon.bind(this);
    this.props.actions.update({
      submissionId: this.props.match.params.id,
      result: "WJ"
    });
  }

  loadCode() {
    if(this.props.result !== "WJ") {
      clearInterval(this.timer);
    }
    else {
      fetch(`/_api/submission/${this.props.match.params.id}`)
        .then((res) => {
          return res.json();
        }).then((res) => {
          console.log(res);
          this.props.actions.update({
            problem: res.problem,
            userDat: res.user,
            lang: res.lang,
            code: res.code,
            result: res.result,
            testcases: res.testcases,
          });
        });
    }
  }

  renderCode(src) {
    if (src) {
      return (
        <div>
          <pre class="prettyprint linenums"><code>
            {src}
          </code></pre>
        </div>
      );
    }
    else {
      return (<Spinner color="light" />);
    }
  }

  renderIcon(val) {
    if (val === "WJ") {
      return (<Badge color="secondary">WJ</Badge>);
    }
    else if (val === "AC") {
      return (<Badge color="success">AC</Badge>);
    }
    else if (val === "IE") {
      return (<Badge color="danger">IE</Badge>);
    }
    else {
      return (<Badge color="warning">{this.props.result}</Badge>);
    }
  }

  componentDidMount() {
    this.timer = setInterval(this.loadCode, 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <p className="lead">Language:{this.props.lang}</p>
          <p className="lead">Source Code</p>
          { this.renderCode(this.props.code) }
          { (this.props.problem === null || this.props.userDat === null ?
            <Spinner color="light" /> :
            (
              <Table>
                <tbody>
                  <tr>
                    <th scope="row">Problem</th>
                    <td><a href={"/problems/" + this.props.problem.id}>{this.props.problem.title}</a></td>
                  </tr>
                  <tr>
                    <th scope="row">User</th>
                    <td><a href={"/users/" + this.props.userDat.id}>{this.props.userDat.name}</a></td>
                  </tr>
                  <tr>
                    <th scope="row">Result</th>
                    <td>{this.renderIcon(this.props.result)}</td>
                  </tr>
                </tbody>
              </Table>
            )
          )}
          <Table>
            <thead>
              <th>testcase</th>
              <th>result</th>
            </thead>
            <tbody>
              {this.props.testcases.map((test) => {
                return (
                  <tr>
                    <td><a href={"/" + test.exec_id}>{test.name}</a></td>
                    <td>{this.renderIcon(test.result)}</td>
                  </tr>
                );
              })}
            </tbody>
          </Table>
        </Jumbotron>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  submissionId: state.submissionId,
  problem: state.problem,
  userDat: state.userDat,
  lang: state.lang,
  code: state.code,
  result: state.result,
  testcases: state.testcases,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(myActions, dispatch)
});
const CodeResult = connect(mapStateToProps, mapDispatchToProps)(CodeResultComponent);
export default CodeResult;
