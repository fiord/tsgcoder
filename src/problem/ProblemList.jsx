import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Link } from 'react-router-dom';
import { Table } from 'reactstrap';
import * as myActions from '../redux/action';

class ProblemListComponent extends React.Component {
  constructor(props) {
    super(props);
    this.loadProblemList = this.loadProblemList.bind(this);
  }
  
  loadProblemList() {
    return fetch("/_api/problems")
      .then(response => response.json())
      .then(response_json => {
        console.log("res:", response_json);
        this.props.actions.update({ problems: response_json.problems });
      })
      .catch(error => {
        console.error(error);
      });
  }

  componentDidMount() {
    this.loadProblemList();
  }

  render() {
    console.log(this.props.problems);
    const problem_list = this.props.problems.map(problem => {
      return (
        <tr key={`Problems-${problem.id}`}>
          <th scope="row">{problem.id}</th>
          <td>
            <Link to={`/problems/${problem.id}`}>{problem.title}</Link>
          </td>
        </tr>
      );
    });

    return (
      <Table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
          </tr>
        </thead>
        <tbody>
          {problem_list}
        </tbody>
      </Table>
    );
  }
}

const mapStateToProps = (state) => ({
  problems: state.problems
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(myActions, dispatch)
});
const ProblemList = connect(mapStateToProps, mapDispatchToProps)(ProblemListComponent);
export default ProblemList;
