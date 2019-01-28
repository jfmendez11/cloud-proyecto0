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

  render() {
    let view = this.state.view === 'events' ? this.renderEvents() : this.renderLogin();
    return (
      <div>
        <div className="row justify-content-center align-self-center">
          <img id="logo-img" src={window.location.origin + "/images/logo-l.png"} alt="ABC Eventos Logo"></img>
        </div>
        {view}
      </div>
    );
  }
}

export default App;