const mongoose = require('mongoose');

const TareaSchema = new mongoose.Schema({
  titulo: { type: String, required: true },
  detalle: { type: String, required: true },
  fechaCreacion: { type: Date, default: Date.now },
  estado: { type: String, enum: ['pendiente', 'en progreso', 'completada'], default: 'pendiente' }
});

module.exports = mongoose.model('Tarea', TareaSchema);
