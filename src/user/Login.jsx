import React from 'react';

class Login extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <a href="/auth/twitter">Sign in with Twitter</a>
    );
  }
}

export default Login;
