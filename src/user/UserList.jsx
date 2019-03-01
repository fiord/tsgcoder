import React, { Compoenent } from 'react';
import { Link } from 'react-router-dom';
import { Table, Button, Form } from 'reactstrap';

class UserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      users: [],
    };

    this.loadUserList = this.loadUserList.bind(this);
  }
  
  loadUserList() {
    return fetch("/_api/users")
      .then(response => response.json())
      .then(response_json => this.setState({ users: response_json.users, }))
      .catch(error => {
        console.error(error);
      });
  }

  componentWillMount() {
    this.loadUserList();
  }

  render() {
    const user_list = this.state.users.map(user => {
      return (
        <tr key={`UserList-${user.id}`}>
          <th scope="row">
            <Link to={`/users/${user.id}`}>{user.id}</Link>
          </th>
          <td>{user.name}</td>
          <td>{user.twitter}</td>
          <td>
            <Link to={`/users/${user.id}/edit`}><Button color="primary">Edit</Button></Link>
            <form action={'/_api/users/' + user.id + '?_method=DELETE'} method="post">
              <input name="_method" type="hidden" value="DELETE" readOnly />
              <input name="id" type="hidden" value={user.id} readOnly />
              <input type="submit" value="Delete" />
            </form>
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
            <th>Twitter</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {user_list}
        </tbody>
      </Table>
    );
  }
}

export default UserList;
