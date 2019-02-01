var React = require('react');

class UserNew extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };

    this.onChangeField = this.onChangeField.bind(this);
  }

  onChangeField(e) {
    var user = this.state.user;
    user[e.target.name] = e.target.value;
    this.setState({
      user: user
    });
  }

  render() {
    const user = this.state.user || {};
    const id = (user.id ? <div>ID: {user.id}</div> : '');
    return (
      <form action={'/_api/users'} method='post'>
        <input name="_method" type="hidden" value="PUT" readOnly />
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

export default UserNew;
