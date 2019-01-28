import React, { Component } from 'react';
import './App.css';
import RenderEvents from './RenderEvents.js';
import Modal from 'react-modal';
import Pagination from "react-js-pagination";
import PropTypes from 'prop-types';

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

class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
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
      activePage: 1,
      min: 0,
      max: 9,
    }
  }

  componentDidMount() {
    fetch('/events')
    .then((res) => {
      if (res.status !== 200) {
        console.log('Error: ', res.status);
      }
      return res.json();
    })
    .then((json) => {
      this.setState({
        events: json.filter((e) => e.user === this.props.user._id)
      });
    });
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
      //currentIndex: i,
    });
    this.openModalDetails();
  }

  addEvent() {
    let event = {
      nombre: this.state.nombre,
      categoria: this.state.categoria,
      lugar: this.state.lugar,
      direccion: this.state.direccion,
      fechaInicio: this.state.fechaInicio,
      fechaFin: this.state.fechaFin,
      presencial: this.state.presencial,
      fechaCreacion: new Date(),
      user: this.props.user._id,
    };
    if(!this.state.nombre || !this.state.lugar || !this.state.direccion || !this.state.fechaInicio || !this.state.fechaFin) {
      alert('Debe llenar todos los campos');
      return;
    }

    let fechaInicio = Date.parse(this.state.fechaInicio);
    let fechaFin = Date.parse(this.state.fechaFin);
    let creacion = event.fechaCreacion.toLocaleDateString().split('/');
    let fechaCreacion = Date.parse(creacion[2] + '-' + (creacion[1].length === 1 ? '0'+creacion[1]:creacion[1]) + '-' + creacion[0]);

    if(fechaInicio > fechaFin) {
      alert('La fecha de inicio debe ser antes de la fecha de finalización');
      return;
    }
    
    if(fechaCreacion > fechaInicio) {
      alert('La fecha de inicio debe ser después de la fecha actual');
      return;
    }
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

    fetch('/events', {
      method: 'POST',
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json",
      },
    })
    .then((res) => {
      if(res.status !== 200) {
        console.log('Error', res.status);
      }
      return res.json();
    })
    .then((json) => {
      alert(json.message);
    })
    .then(() => this.componentDidMount());
  }

  showDetails() {
    let fechaInicio = this.state.currentEvent.fechaInicio ? this.state.currentEvent.fechaInicio.split('T')[0] : '';
    let fechaFin = this.state.currentEvent.fechaFin ? this.state.currentEvent.fechaFin.split('T')[0] : '';
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
              <td className="details table-cell text-center">{fechaInicio}</td>
            </tr>
            <tr>
              <td className="details table-cell text-center">Fecha Fín</td>
              <td className="details table-cell text-center">{fechaFin}</td>
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
    this.setState({
      modalDetailsIsOpen: false,
    });
    fetch("/events/" + this.state.currentEvent._id, {
      method: "DELETE"
    })
    .then((res) => {
      if (res.status !== 200) {
        console.log("Error");
        console.log(res.status);
      }
      return res.json();
    })
    .then((json) => {
      alert(json.message);
    })
    .then(() => this.componentDidMount());
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

    this.setState({
      modalDetailsIsOpen: false,
      nombre: '',
      categoria: 'Conferencia',
      lugar: '',
      direccion: '',
      fechaInicio: '',
      fechaFin: '',
      presencial: true,
      currentEvent: {},
      update: false,
    });


    fetch("/events/" + this.state.currentEvent._id, {
      method: "PUT",
      body: JSON.stringify(event),
      headers: {
        "Content-Type": "application/json"
      }
    }).then((res) => {
      if (res.status !== 200) {
        console.log("Error");
        console.log(res.status);
      }
      return res.json();
    })
    .then((json) => {
      alert(json.message);
    })
    .then(() => this.componentDidMount());
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

  handlePageChange(pageNumber) {
    this.setState({activePage: pageNumber});
    let max = pageNumber*10 - 1;
    let min = (pageNumber-1)*10;
    this.setState({min: min, max: max});
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
          <button className="btn btn-format" onClick={this.openModalCreate.bind(this)}>Crear evento</button>
        </div>
        <div className="row justify-content-center align-self-center" id="events">
          <RenderEvents events={this.state.events} min={this.state.min} max={this.state.max} handleClick={this.handleClick.bind(this)}/>
        </div>
        <div className="row justify-content-center align-self-center">
          <Pagination
            activePage={this.state.activePage}
            itemsCountPerPage={10}
            totalItemsCount={this.state.events.length}
            pageRangeDisplayed={5}
            onChange={this.handlePageChange.bind(this)}
            linkClass="pagination-a"
            activeLinkClass="active-a"
          />
        </div>
      </div>
    );
  }
}

Events.propTypes = {
  user: PropTypes.object.isRequired,
};

export default Events;