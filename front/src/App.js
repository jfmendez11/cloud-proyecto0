import React, { Component } from 'react';
import './App.css';
import Events from './Events.js';
import LoginRegister from './LoginRegister.js';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      view: 'login',
      user: {},
    }
  }

  renderLogin() {
    return(
      <LoginRegister registeredLogged={this.registeredLogged.bind(this)}/>
    );
  }

  renderEvents() {
    return(
      <Events user={this.state.user}/>
    );
  }

  registeredLogged(user) {
    this.setState({
      view: 'events',
      user: user,
    });
  }

  handleLogout() {
    this.setState({
      view: 'login',
      user: {},
    });
  }

  renderUserOptions() {
    return(
      <div className="container">
        <div className="row">
          <code>{this.state.user.email}</code><span> {' | '} </span> 
          <button type="button" className="btn btn-link" onClick={this.handleLogout.bind(this)}>Logout</button> 
        </div>
      </div>
    );
  }

  render() {
    let view = this.state.view === 'events' ? this.renderEvents() : this.renderLogin();
    return (
      <div>
        {this.state.view === 'events' ? this.renderUserOptions() : <div></div>}
        <div className="row justify-content-center align-self-center">
          <img id="logo-img" src={window.location.origin + "/images/logo-l.png"} alt="ABC Eventos Logo"></img>
        </div>
        {view}
      </div>
    );
  }
}

export default App;