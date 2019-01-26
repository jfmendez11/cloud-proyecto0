/* global require */
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EventsSchema = new Schema({
    nombre: {type: String, require: true},
    categoria: {type: String, require: true},
    lugar: {type: String, require: true},
    direccion: {type: String, require: true},
    fechaInicio: {type: Date, require: true},
    fechaFin: {type: Date, require: true},
    presencial: {type: Boolean, require: true},
});

module.exports = mongoose.model('Events', EventsSchema);