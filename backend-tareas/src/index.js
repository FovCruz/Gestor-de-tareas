const express = require('express');
const connectDB = require('../config/db');
const cors = require('cors');
require('dotenv').config();

const tareaRoutes = require('../routes/tareaRoutes');
const usuarioRoutes = require('../routes/usuarioRoutes');
const snsRoutes = require('../routes/snsRoutes');
const authMiddleware = require('../config/authMiddleware');

const app = express();
connectDB();

// Configuración de CORS dinámica
const corsOrigins = process.env.CORS_ORIGIN 
  ? process.env.CORS_ORIGIN.split(',').map(origin => origin.trim())
  : ['http://localhost:5173'];

console.log('CORS origins permitidos:', corsOrigins);

app.use(cors({
  origin: function (origin, callback) {
    // Permitir requests sin origin (mobile apps, postman, etc.)
    if (!origin) return callback(null, true);
    
    if (corsOrigins.indexOf(origin) !== -1 || corsOrigins.includes('*')) {
      callback(null, true);
    } else {
      callback(new Error('No permitido por CORS'), false);
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
app.use(express.json());
app.use(authMiddleware);
app.use('/api/tareas', tareaRoutes);
app.use('/api/usuarios', usuarioRoutes);
app.use('/api/sns', snsRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
