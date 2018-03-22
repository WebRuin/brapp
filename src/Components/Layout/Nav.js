import React, { Component } from 'react';
import { auth, provider } from '../../firebase.js';
import * as NavActions from '../../Actions/NavActions';
import MapStore from "../../Stores/MapStore";


import './nav.css';

export default class Nav extends Component {

  constructor() {
    super();
    this.state = {
      user: NavActions.getUser
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  login() {
    auth.signInWithPopup(provider) 
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }
  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }

  componentDidMount() {
    NavActions.getUser();
    MapStore.on("change", MapStore.getUser);

  }

  render() {
    return (
      <div>
        <nav className="nav">
            <h1>Fun Food Friends</h1>
            {this.state.user ?
              <button onClick={this.logout}>Logout</button>                
            :
              <button onClick={this.login}>Log In</button>              
            }
        </nav>
      </div>
    )
  }
}