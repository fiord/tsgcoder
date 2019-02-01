import React, { Component } from 'react';
import { BrowserRouter, Route, Link } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarBrand,
  NavbarToggler,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropDown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem } from 'reactstrap';
import UserList from './user/UserList';
import UserDetail from './user/UserDetail';
import UserNew from './user/UserNew';
import UserEdit from './user/UserEdit';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <h2>Hello, TSGCoder</h2>
      </div>
    );
  }
}

class TSGCoder extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };
    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState({ isOpen: !this.state.isOpen });
  }

  render() {
    return (
      <BrowserRouter>
        <div>
          <Navbar color="light" light expand="md">
            <NavbarBrand href="/">TSGCoder</NavbarBrand>
            <NavbarToggler onClick={this.toggle} />
            <Collapse isOpen={this.state.isOpen} navbar>
              <Nav className="ml-auto" navbar>
                <NavItem>
                  <NavLink href="/users">ユーザー一覧</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink href="https://github.com/HyogaGlacier/tsgcoder">Github</NavLink>
                </NavItem>
              </Nav>
            </Collapse>
          </Navbar>
          <Route exact path="/" component={Home} />
          <Route exact path="/users" component={UserList} />
          <Route exact path='/users/:id([0-9]+)' component={UserDetail} />
          <Route exact path="/users/new" component={UserNew} />
          <Route exact path="/users/:id([0-9]+)/edit" component={UserEdit} />
        </div>
      </BrowserRouter>
    );
  }
}

export default TSGCoder;
