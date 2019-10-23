import React from 'react';

class UserEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      user: {},
    };

    this.loadUser = this.loadUser.bind(this);
    this.onChangeField = this.onChangeField.bind(this);
  }

  loadUser() {
    return fetch(`/_api/users/${this.state.id}`)
      .then(response => response.json())
      .then(response_json => this.setState({
        user: response_json.user,
      }))
      .catch(error => {
        console.error(error);
      });
  }

  onChangeField(e) {
    var user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({
      user: user
    });
  }

  componentWillMount() {
    this.loadUser();
  }

  render() {
    const user = this.state.user || {};
    const id = (user.id ? <div>ID: {user.id}</div> : '');
    return (
      <form action={'/_api/users/' + user.id + '?_method=PUT'} method='post'>
        <input name="_method" type="hidden" value="PUT" readOnly />
        {id}
        <div>Name: <input type="text" name="name" value={user.name} placeholder="Input Your Name" onChange={this.onChangeField} /></div>
        <div>Twitter: <input type="text" name="twitter" value={user.twitter} placeholder="Your Twitter Account" onChange={this.onChangeField} /></div>
        <div>User Type: <input type="radio" name="class" defaultValue="normal" checked={this.onChangeField} />
                        <input type="radio" name="class" defaultValue="admin" checked={this.onChangeField} />
        </div>
        <div>Note: <input type="text" name="note" value={user.note} placeholder="write anything" onChange={this.onChangeField} /></div>
      </form>
    );
  }
}

export default UserEdit;
