import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Spinner, Media, Table } from 'reactstrap';
import * as myActions from '../redux/action';

// view list of your code.
class MyPageComponent extends React.Component {
  constructor(props) {
    super(props);
    this.loadUser = this.loadUser.bind(this);
    this.loadCode = this.loadCode.bind(this);
  }

  async loadUser() {
    fetch('/_api/users/').then((res) => res.json()).then((res) => {
      this.props.actions.update({
        user: res.user,
        error: res.error
      });
    });
  }

  async loadCode() {
    fetch('/test/codes').then((res) => res.json()).then((res) => {
      console.log(res);
      this.props.actions.update({
        codes: res.codes,
        error: res.error,
      });
    });
  }

  componentDidMount() {
    this.loadUser().then(() => this.loadCode());
  }

  render() {
    if(this.props.error) {
      return (
        <p>{this.props.error}</p>
      );
    }
    else if(!this.props.user) {
      return <Spinner color="light" size="lg" />
    }
    else {
      return (
        <div>
          <Media>
            <Media left>
              <Media object style={{height: "128px", width: "128px"}} src={this.props.user.image} />
            </Media>
            <Media body heading>
              {this.props.user.name}
            </Media>
          </Media>
          {this.props.codes ? (
          <Table>
            <thead>
              <tr>
                <th>id</th>
                <td>language</td>
                <td>length</td>
                <td>created_at</td>
                <td>state</td>
              </tr>
            </thead>
            <tbody>
              {this.props.codes.map((code) => {
                return (
                  <tr>
                    <th scope="row"><a href={`/${code.id}`}>{code.id}</a></th>
                    <td>{code.lang}</td>
                    <td>{code.code.length}</td>
                    <td>{code.created_at}</td>
                    <td>{code.state}</td>
                  </tr>
                );
              })}
            </tbody> 
          </Table>
          ):(<Spinner color="light" />)}
        </div>
      );
    }
  }
};

const mapStateToProps = (state) => ({
  user: state.user,
  codes: state.codes,
  error: state.error,
  state: state.state,
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(myActions, dispatch)
});
const MyPage = connect(mapStateToProps, mapDispatchToProps)(MyPageComponent);
export default MyPage;
