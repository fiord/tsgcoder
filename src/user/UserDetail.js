import React, { Component } from 'react';

class UserDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      id: this.props.match.params.id,
      user: {},
    };

    this.loadUser = this.loadUser.bind(this);
  }

  loadUser() {
    return fetch(`/_api/users/${this.state.id}`)
      .then(response => response.json())
      .then(response_json => this.setState({ user: response_json.user }))
      .cache(error => {
        console.error(error);
      });
  }

  componentWillMount() {
    this.loadUser();
  }

  render() {
    const attributes_array = ["name", "twitter", "class", "note", "created_at"].map(attr => {
      return {
        name: attr,
        val: this.state.user[attr] ? this.state.user[attr].toString() : '...loading'
      };
    });
    return (
      <dl>
        {attributes_array.reduce((accumulator, attr, idx) => {
          return accumulator.concat([
            <dt key={`attrname-${idx}`}>{attr.name}</dt>,
            <dd key={`attrval-${idx}`}>{attr.val}</dd>
          ]);
        }, [])}
      </dl>
    );
  }
}

export default  UserDetail;
