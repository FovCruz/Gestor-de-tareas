const express = require('express');
const connectDB = require('../config/db');
const cors = require('cors');
require('dotenv').config();

const tareaRoutes = require('../routes/tareaRoutes');
const usuarioRoutes = require('../routes/usuarioRoutes');
const authMiddleware = require('../config/authMiddleware');

const app = express();
connectDB();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(authMiddleware);
app.use('/api/tareas', tareaRoutes);
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
