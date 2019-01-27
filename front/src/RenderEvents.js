import React, { Component } from 'react';
import PropTypes from 'prop-types';

class RenderEvents extends Component {
    render() {
        let filteredEvents = this.props.events.filter((e, i) => i >= this.props.min && i <= this.props.max);
        return (
            <div className="justify-content-center align-self-center">
                <table className="table table-bordered">
                    <thead>
                    <tr>
                        <th className="text-center" scope="col">Fecha de Creación</th>
                        <th className="text-center" scope="col">Nombre</th>
                        <th className="text-center" scope="col">Acciones</th>
                    </tr>
                    </thead>
                    <tbody>
                        {filteredEvents.map((e,i) => {
                            let fechaCreacion = e.fechaCreacion;
                            let fechaCreacion2 = fechaCreacion.replace(/T/g, ' ');
                            let fechaCreacion3 = fechaCreacion2.replace(/Z/g, '');
                            return (
                            <tr key={e._id}>
                                <td className="table-cell text-center">{fechaCreacion3.split('.')[0]}</td>
                                <td className="table-cell text-center">{e.nombre}</td>
                                <td className="table-cell text-center"><button className="btn-format-table" onClick={() => this.props.handleClick(e,i)}>Ver Detalles</button></td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        );
    }
}

RenderEvents.propTypes = {
    events: PropTypes.array.isRequired,
    handleClick: PropTypes.func.isRequired,
};

export default RenderEvents;