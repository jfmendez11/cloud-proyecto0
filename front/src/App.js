import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Events from './Events.js';
import Modal from 'react-modal';

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [
        {
          nombre: 'Evento 1',
          categoria: 'Conferencia',
          lugar: 'lugar 1',
          direccion: 'direccion 1',
          fechaInicio: new Date().toLocaleDateString(),
          fechaFin: new Date().toLocaleDateString(),
          presencial: true,
          fechaCreacion: new Date().toLocaleDateString(),
        },
        {
          nombre: 'Evento 2',
          categoria: 'Seminario',
          lugar: 'lugar 2',
          direccion: 'direccion 2',
          fechaInicio: new Date().toLocaleDateString(),
          fechaFin: new Date().toLocaleDateString(),
          presencial: false,
          fechaCreacion: new Date().toLocaleDateString(),
        },
        {
          nombre: 'Evento 3',
          categoria: 'Congreso',
          lugar: 'lugar 3',
          direccion: 'direccion 3',
          fechaInicio: new Date().toLocaleDateString(),
          fechaFin: new Date().toLocaleDateString(),
          presencial: true,
          fechaCreacion: new Date().toLocaleDateString(),
        },
        {
          nombre: 'Evento 4',
          categoria: 'Curso',
          lugar: 'lugar 4',
          direccion: 'direccion 4',
          fechaInicio: new Date().toLocaleDateString(),
          fechaFin: new Date().toLocaleDateString(),
          presencial: false,
          fechaCreacion: new Date().toLocaleDateString(),
        },
      ],
      modalCreateIsOpen: false,
      modalDetailsIsOpen: false,
      update: false,
      currentEvent: {},
      nombre: '',
      categoria: 'Conferencias',
      lugar: '',
      direccion: '',
      fechaInicio: '',
      fechaFin: '',
      presencial: true,
      currentIndex: -1,
    }
  }

  openModalCreate() {
    this.setState({modalCreateIsOpen: true});
  }

  afterOpenModalCreate() {
    // references are now sync'd and can be accessed.
  }

  closeModalCreate() {
    this.setState({
      modalCreateIsOpen: false,
      nombre: '',
      categoria: 'Conferencias',
      lugar: '',
      direccion: '',
      fechaInicio: '',
      fechaFin: '',
      presencial: true,
    });
  }

  openModalDetails() {
    this.setState({modalDetailsIsOpen: true});
  }

  afterOpenModalDetails() {
    // references are now sync'd and can be accessed.
  }

  closeModalDetails() {
    this.setState({
      modalDetailsIsOpen: false,
      currentEvent:{},
      update: false, 
      currentIndex: -1,
    });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  handleInputChangeCatPres(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    if(name === 'presencial') {
      let currentEvent = this.state.currentEvent;
      currentEvent.presencial = value;
      this.setState({
        currentEvent: currentEvent,
      });
    } else {
      let currentEvent = this.state.currentEvent;
      currentEvent.categoria = value;
      this.setState({
        currentEvent: currentEvent,
      });
    };
  }

  handleClick(e,i) {
    this.setState({
      currentEvent: e,
      currentIndex: i,
    });
    this.openModalDetails();
  }

  addEvent() {
    let event = [{
      nombre: this.state.nombre,
      categoria: this.state.categoria,
      lugar: this.state.lugar,
      direccion: this.state.direccion,
      fechaInicio: this.state.fechaInicio,
      fechaFin: this.state.fechaFin,
      presencial: this.state.presencial,
      fechaCreacion: new Date().toLocaleDateString(),
    }];
    let events = this.state.events;
    this.setState({
      events: events.concat(event),
      modalCreateIsOpen: false,
      nombre: '',
      categoria: 'Conferencias',
      lugar: '',
      direccion: '',
      fechaInicio: '',
      fechaFin: '',
      presencial: true,
    });
  }

  showDetails() {
    return (
      <div className="col-md-12 justify-content-center align-self-center">
        <h2 className="text-center">{this.state.currentEvent.nombre}</h2>
        <table>
          <tbody className="table">
            <tr>
              <td className="details table-cell text-center">Categoría</td>
              <td className="details table-cell text-center">{this.state.currentEvent.categoria}</td>
            </tr>
            <tr>
              <td className="details table-cell text-center">Lugar</td>
              <td className="details table-cell text-center">{this.state.currentEvent.lugar}</td>
            </tr>
            <tr>
              <td className="details table-cell text-center">Dirección</td>
              <td className="details table-cell text-center">{this.state.currentEvent.direccion}</td>
            </tr>
            <tr>
              <td className="details table-cell text-center">Fecha Inicio</td>
              <td className="details table-cell text-center">{this.state.currentEvent.fechaInicio}</td>
            </tr>
            <tr>
              <td className="details table-cell text-center">Fecha Fín</td>
              <td className="details table-cell text-center">{this.state.currentEvent.fechaFin}</td>
            </tr>
            <tr>
              <td className="details table-cell text-center">Presencial</td>
              <td className="details table-cell text-center">{this.state.currentEvent.presencial ? 'Presencial' : 'Virtual'}</td>
            </tr>
          </tbody>
        </table>
        <div className="row justify-content-center align-self-center">
          <button type="button" className="btn-format"  onClick={this.clickUpdate.bind(this)}>Editar</button>
          <button type="button" className="btn-format-2" onClick={this.deleteEvent.bind(this)}>Eliminar</button>
        </div>
        
      </div>
    );
  }

  deleteEvent() {
    let newArray = this.state.events.filter((e) => e.nombre !== this.state.currentEvent.nombre)
    this.setState({
      events: newArray,
      modalDetailsIsOpen: false,
    });
  }

  clickUpdate() {
    this.setState({
      update: true,
    });
  }

  updateEvent() {
    let event = {
      nombre: this.state.nombre,
      categoria: this.state.currentEvent.categoria,
      lugar: this.state.lugar,
      direccion: this.state.direccion,
      fechaInicio: this.state.fechaInicio,
      fechaFin: this.state.fechaFin,
      presencial: this.state.currentEvent.presencial,
      fechaCreacion: this.state.currentEvent.fechaCreacion,
    };

    if(!event.nombre) event.nombre = this.state.currentEvent.nombre;
    if(!event.lugar) event.lugar = this.state.currentEvent.lugar;
    if(!event.direccion) event.direccion = this.state.currentEvent.direccion;
    if(!event.fechaInicio) event.fechaInicio = this.state.currentEvent.fechaInicio;
    if(!event.fechaFin) event.fechaFin = this.state.currentEvent.fechaFin;

    let events = this.state.events;
    events[this.state.currentIndex] = event;
    this.setState({
      events: events,
      modalDetailsIsOpen: false,
      nombre: '',
      categoria: 'Conferencia',
      lugar: '',
      direccion: '',
      fechaInicio: '',
      fechaFin: '',
      presencial: true,
      currentEvent: {},
      currentIndex: -1,
      update: false,
    })
  }

  renderUpdateEvent() {    
    return (
      <div className="col-md-12 justify-content-center align-self-center">
        <form>
            <label className="col-form-label col-md-6">
              Nombre
            </label>
            <input className="col-md-6" name="nombre" type="text" value={this.state.nombre} onChange={this.handleInputChange.bind(this)}/>
            
            <br/>
            <label className="col-form-label col-md-6">
              Categoría
            </label>
             <select className="col-md-6" name="categoria" value={this.state.currentEvent.categoria} onChange={this.handleInputChangeCatPres.bind(this)}>
                <option value="Conferencia">Conferencia</option>
                <option value="Seminario">Seminario</option>
                <option value="Congreso">Congreso</option>
                <option value="Curso">Curso</option>
              </select>
            
            <br/>
            <label className="col-form-label col-md-6">
              Lugar
            </label>
            <input className="col-md-6" name="lugar" type="text" value={this.state.lugar} onChange={this.handleInputChange.bind(this)}/>
            
            <br/>
            <label className="col-form-label col-md-6">
              Dirección
            </label>
            <input className="col-md-6" name="direccion" type="text" value={this.state.direccion} onChange={this.handleInputChange.bind(this)}/>
            
            <br/>
            <label className="col-form-label col-md-6">
              Fecha de Inicio
            </label>
            <input className="col-md-6" name="fechaInicio" type="date" value={this.state.fechaInicio} onChange={this.handleInputChange.bind(this)}/>
            
            <br/>
            <label className="col-form-label col-md-6">
              Fecha de Finalización
            </label>
            <input className="col-md-6" name="fechaFin" type="date" value={this.state.fechaFin} onChange={this.handleInputChange.bind(this)}/>
            
            <br/>
            <label className="col-form-label col-md-6">
              Presencial
            </label>
            <input name="presencial" type="checkbox" checked={this.state.currentEvent.presencial} onChange={this.handleInputChangeCatPres.bind(this)}/>
            
            <br/>
            <div className="row justify-content-center align-self-center">
              <button type="button" className="btn-format"  onClick={this.updateEvent.bind(this)}>Modificar</button>
              <button type="button" className="btn-format-2" onClick={this.closeModalDetails.bind(this)}>Cancelar</button>
            </div>
            
          
        </form>
      </div>
    );
  }

  render() {
    return (
      <div className="container text-center">
        <Modal
          isOpen={this.state.modalCreateIsOpen}
          onAfterOpen={this.afterOpenModalCreate.bind(this)}
          onRequestClose={this.closeModalCreate.bind(this)}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >

          <h2>Llene los siguientes campos</h2>
          <form>
            <label className="col-form-label col-md-6">
              Nombre
            </label>
            <input className="col-md-6" name="nombre" type="text" value={this.state.nombre} onChange={this.handleInputChange.bind(this)}/>
            
            <br/>
            <label className="col-form-label col-md-6">
              Categoría
            </label>
             <select className="col-md-6" name="categoria" value={this.state.categoria} onChange={this.handleInputChange.bind(this)}>
                <option value="Conferencia">Conferencia</option>
                <option value="Seminario">Seminario</option>
                <option value="Congreso">Congreso</option>
                <option value="Curso">Curso</option>
              </select>
            
            <br/>
            <label className="col-form-label col-md-6">
              Lugar
            </label>
            <input className="col-md-6" name="lugar" type="text" value={this.state.lugar} onChange={this.handleInputChange.bind(this)}/>
            
            <br/>
            <label className="col-form-label col-md-6">
              Dirección
            </label>
            <input className="col-md-6" name="direccion" type="text" value={this.state.direccion} onChange={this.handleInputChange.bind(this)}/>
            
            <br/>
            <label className="col-form-label col-md-6">
              Fecha de Inicio
            </label>
            <input className="col-md-6" name="fechaInicio" type="date" value={this.state.fechaInicio} onChange={this.handleInputChange.bind(this)}/>
            
            <br/>
            <label className="col-form-label col-md-6">
              Fecha de Finalización
            </label>
            <input className="col-md-6" name="fechaFin" type="date" value={this.state.fechaFin} onChange={this.handleInputChange.bind(this)}/>
            
            <br/>
            <label className="col-form-label col-md-6">
              Presencial
            </label>
            <input name="presencial" type="checkbox" checked={this.state.presencial} onChange={this.handleInputChange.bind(this)}/>
            
            <br/>
            <div className="row justify-content-center align-self-center">
              <button type="button" className="btn-format"  onClick={this.addEvent.bind(this)}>Agregar</button>
              <button type="button" className="btn-format-2" onClick={this.closeModalCreate.bind(this)}>Cancelar</button>
            </div>
        </form>
        </Modal>
        <Modal
          isOpen={this.state.modalDetailsIsOpen}
          onAfterOpen={this.afterOpenModalDetails.bind(this)}
          onRequestClose={this.closeModalDetails.bind(this)}
          style={customStyles}
          contentLabel="Example Modal"
          ariaHideApp={false}
        >
          {this.state.update ? this.renderUpdateEvent() : this.showDetails()}
        </Modal>
        <div className="row justify-content-center align-self-center">
          <img id="logo-img" src={window.location.origin + "/images/logo-l.png"} alt="ABC Eventos Logo"></img>
        </div>
        <div className="row justify-content-center align-self-center">
          <button className="btn btn-format" onClick={this.openModalCreate.bind(this)}>Crear evento</button>
        </div>
        <div className="row justify-content-center align-self-center">
          <Events events={this.state.events} handleClick={this.handleClick.bind(this)}/>
        </div>
      </div>
    );
  }
}

export default App;