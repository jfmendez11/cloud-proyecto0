import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './App.css';

class LoginRegister extends Component {
  constructor(props) {
    super(props);
    this.state = {
      emailLog: '',
      emailReg: '',
      passwordLog: '',
      passwordReg: '',
      passwordConf: '',
    }
  }

  //Renderiza el from para crear una nueva cuenta
  renderRegister() {
    return (
      <div className="col-md-6 log-reg">
        <h2 className="text-center">Registrarse</h2>
        <form>
          <label className="col-form-label col-md-6">
            Correo
          </label>
          <input name="emailReg" type="text" onChange={this.handleInputChange.bind(this)} value={this.state.emailReg}/>
          <label className="col-form-label col-md-6">
            Contraseña
          </label>
          <input name="passwordReg" type="password" onChange={this.handleInputChange.bind(this)} value={this.state.passwordReg}/>
          <label className="col-form-label col-md-6">
            Confirmar Contraseña
          </label>
          <input name="passwordConf" type="password" onChange={this.handleInputChange.bind(this)} value={this.state.passwordConf}/>
          <div className="row justify-content-center align-self-center">
            <button type="button" className="btn-format" onClick={this.handleRegisterClick.bind(this)}>Registrar</button>
          </div>
        </form>
      </div>
    );
  }

  //Renderiza el form para loggearse a una cuenta existente
  renderLogin() {
    return (
      <div className="col-md-6 log-reg">
        <h2 className="text-center">Log In</h2>
        <form>
          <label className="col-form-label col-md-6">
            Correo
          </label>
          <input name="emailLog" type="text" onChange={this.handleInputChange.bind(this)} value={this.state.emailLog}/>
          <label className="col-form-label col-md-6">
            Contraseña
          </label>
          <input name="passwordLog" type="password" onChange={this.handleInputChange.bind(this)} value={this.state.passwordLog}/>
          <br/>
          <div className="row justify-content-center align-self-center">
            <button type="button" className="btn-format" onClick={this.handleLoginClick.bind(this)}>Log In</button>
          </div>
        </form>
      </div>
    );
  }

  //Manejador de cambio en los inputs
  handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  //Manejador del botón de ingreso
  handleLoginClick() {
    let user = {
      logemail: this.state.emailLog,
      logpassword: this.state.passwordLog,
    };
    fetch('/users/log-in', {
      method: 'POST',
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
    })
    .then((res) => {
      if(res.status !== 200) {
        console.log(res);
      }
      return res.json();
    })
    .then((json) => {
      alert(json.message);
      if(json.status === 200) this.props.registeredLogged(json.user);
  });
  }

  //Manejador del botón de registro
  handleRegisterClick() {
    let user = {
      email: this.state.emailReg,
      password: this.state.passwordReg,
      passwordConf: this.state.passwordConf,
    };
    fetch('/users', {
        method: 'POST',
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        if(res.status !== 200) {
          console.log(res);
        }
        return res.json();
      })
      .then((json) => {
        alert(json.message);
        if(json.status === 200) this.props.registeredLogged(json.user);
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row justify-content-center align-self-center">
          {this.renderRegister()}
          {this.renderLogin()}
        </div>
      </div>
    );
  }
}

LoginRegister.propTypes = {
  registeredLogged: PropTypes.func.isRequired,
};

export default LoginRegister;