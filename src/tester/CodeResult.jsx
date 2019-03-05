import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner, Jumbotron } from 'reactstrap';
import * as myActions from '../redux/action';

class CodeResultComponent extends React.Component {
  constructor(props) {
    super(props);
    this.loadCode = this.loadCode.bind(this);
    this.renderCode = this.renderCode.bind(this);
    this.props.actions.update({ codeId: this.props.match.params.id });
  }

  loadCode() {
    if(this.props.state == "finished") {
      clearInterval(this.timer);
    }
    else {
      fetch(`/test/code/${this.props.match.params.id}`)
        .then((res) => {
          return res.json();
        }).then((res) => {
          console.log(res);
          this.props.actions.update({
            lang: res.lang,
            code: res.code.code,
            stdin: res.code.stdin,
            stdout: res.code.stdout,
            stderr: res.code.stderr,
            state: res.code.state,
          });
        });
    }
  }

  renderCode(src) {
    if (src || this.props.state == "finished") {
      return (
        <div>
          <pre class="prettyprint linenums"><code>
            {src}
          </code></pre>
        </div>
      );
    }
    else {
      return <Spinner color="light" />
    }
  }

  componentWillMount() {
    this.timer = setInterval(this.loadCode, 1000);
  }

  componentWillUnMount() {
    clearInterval(this.timer);
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <p className="lead">Language:{this.props.lang}</p>
          <p className="lead">Source Code</p>
          { this.renderCode(this.props.code) }
          <p className="lead">Standard Input</p>
          { this.renderCode(this.props.stdin) }
          <p className="lead">Standard Output</p>
          { this.renderCode(this.props.stdout) }
          <p className="lead">Standard Error</p>
          { this.renderCode(this.props.stderr) }
        </Jumbotron>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  codeId: state.codeId,
  lang: state.lang,
  code: state.code,
  stdin: state.stdin,
  stdout: state.stdout,
  stderr: state.stderr,
  state: state.state,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(myActions, dispatch)
});
const CodeResult = connect(mapStateToProps, mapDispatchToProps)(CodeResultComponent);
export default CodeResult;
