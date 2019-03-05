import React, { Component } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
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

class TSGCoderComponent extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">TSGCoder</NavbarBrand>
            <NavbarToggler onClick={() => this.props.actions.toggle()} />
            <Collapse isOpen={this.props.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/users">ユーザー一覧</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="/users/new">ユーザー追加</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/HyogaGlacier/tsgcoder">Github</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <Route exact path='/' component={CodeForm} />
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

const mapStateToProps = (state) => ({ isOpen: state.isOpen });
const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(myActions, dispatch)
});
const TSGCoder = connect(mapStateToProps, mapDispatchToProps)(TSGCoderComponent);
export default TSGCoder;
