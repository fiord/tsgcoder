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
  }

  loadCode() {
    return fetch(`/_api/code/${this.props.match.params.id}`)
      .then((res) => {
        return res.json();
      }).then((res) => {
        this.props.actions.update({ code: res.code, codeId: this.props.match.params.id });
      });
  }

  renderCode() {
    if (this.props.code) {
      return (
        <pre class="prettyprint linenums"><code>
          {this.props.code.code}
        </code></pre>
      );
    }
    else {
      return <Spinner color="light" />
    }
  }

  componentWillMount() {
    this.loadCode();
  }

  render() {
    return (
      <div>
        <Jumbotron>
          <p className="lead">Source Code</p>
          { this.renderCode() }
        </Jumbotron>
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  codeId: state.codeId,
  code: state.code
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(myActions, dispatch)
});
const CodeResult = connect(mapStateToProps, mapDispatchToProps)(CodeResultComponent);
export default CodeResult;
