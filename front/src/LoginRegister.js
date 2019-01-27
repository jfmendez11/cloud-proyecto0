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
  renderRegister() {
    return (
      <div className="col-md-6 log-reg">
        <h2 className="text-center">Registrarse</h2>
        <form>
          <label className="col-form-label col-md-6">
            Correo
          </label>
          <input name="email" type="text"/>
          <label className="col-form-label col-md-6">
            Contraseña
          </label>
          <input name="password" type="password"/>
          <label className="col-form-label col-md-6">
            Confirmar Contraseña
          </label>
          <input name="confPassword" type="password"/>
          <div className="row justify-content-center align-self-center">
            <button type="button" className="btn-format">Registrar</button>
          </div>
        </form>
      </div>
    );
  }

  renderLogin() {
    return (
      <div className="col-md-6 log-reg">
        <h2 className="text-center">Log In</h2>
        <form>
          <label className="col-form-label col-md-6">
            Correo
          </label>
          <input name="email" type="text"/>
          <label className="col-form-label col-md-6">
            Contraseña
          </label>
          <input name="password" type="password"/>
          <br/>
          <div className="row justify-content-center align-self-center">
            <button type="button" className="btn-format">Log In</button>
          </div>
        </form>
      </div>
    );
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

};

export default LoginRegister;