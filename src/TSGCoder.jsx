import React, { Component } from 'react'; import { BrowserRouter, Route } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink } from 'reactstrap';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as myActions from './redux/action';
import Login from './user/Login';
import UserList from './user/UserList';
import UserDetail from './user/UserDetail';
import UserNew from './user/UserNew';
import UserEdit from './user/UserEdit';
import CodeForm from './tester/CodeForm';
import CodeResult from './tester/CodeResult';
import MyPage from './tester/MyPage';

class TSGCoderComponent extends React.Component {
  constructor(props) {
    super(props);
    this.render_user = this.render_user.bind(this);
  }

  render_user() {
    if(this.props.user) {
      return (
        <NavItem>
          <NavLink href="/mypage">{this.props.user.name}</NavLink>
        </NavItem>
      );
    }
    else {
      return (
        <NavItem>
          <NavLink href="/login">Login</NavLink>
        </NavItem>
      );
    }
  }

  async load_user() {
    const res = await fetch('/_api/users/').then((res) => res.json())
    console.log(res);
    await this.props.actions.update({
      user: res.user,
      error: res.error
    });
  }

  componentDidMount() {
    this.load_user();
  }

  render() {
    console.log("OK");
    return (
      <BrowserRouter>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">TSGCoder</NavbarBrand>
            <NavbarToggler onClick={() => this.props.actions.toggle()} />
            <Collapse isOpen={this.props.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="https://github.com/HyogaGlacier/tsgcoder">Github</NavLink>
                </NavItem>
                {this.render_user()}
              </Nav>
            </Collapse>
          </Navbar>
          <Route exact path='/' component={CodeForm} />
          <Route exact path='/mypage' component={MyPage} />
          <Route exact path='/:id([0-9]+)' component={CodeResult} />
          <Route exact path='/login' component={Login} />
          <Route exact path='/users' component={UserList} />
          <Route exact path='/users/:id([0-9]+)' component={UserDetail} />
          <Route exact path='/users/new' component={UserNew} />
          <Route exact path='/users/:id([0-9]+)/edit' component={UserEdit} />
        </div>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = (state) => ({
  isOpen: state.isOpen,
  user: state.user
});
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(myActions, dispatch)
});
const TSGCoder = connect(mapStateToProps, mapDispatchToProps)(TSGCoderComponent);
export default TSGCoder;
