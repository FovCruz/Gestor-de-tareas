const express = require('express');
const router = express.Router();
const snsController = require('../controllers/snsController');

// Endpoint para enviar datos a SNS
router.post('/enviar-datos', snsController.enviarDatosASNS);

// Endpoint para verificar la configuración de SNS (útil para debugging)
router.get('/verificar-config', snsController.verificarConfiguracionSNS);

module.exports = router;
