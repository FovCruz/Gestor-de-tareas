const configurarSNS = require('../config/snsConfig');

const enviarDatosASNS = async (req, res) => {
  try {
    const { nombre, apellidos, email } = req.body;

    // Validar que los datos requeridos estén presentes
    if (!nombre || !apellidos || !email) {
      return res.status(400).json({
        mensaje: 'Error: nombre, apellidos y email son campos requeridos',
        camposFaltantes: {
          nombre: !nombre,
          apellidos: !apellidos,
          email: !email
        }
      });
    }

    // Validar formato de email básico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        mensaje: 'Error: El formato del email no es válido'
      });
    }

    // Configurar SNS
    const sns = configurarSNS();
    
    // Preparar el mensaje para SNS
    const mensaje = {
      timestamp: new Date().toISOString(),
      datos: {
        nombre,
        apellidos,
        email
      },
      origen: 'backend-tareas'
    };

    // Parámetros para publicar en SNS
    const params = {
      Message: JSON.stringify(mensaje),
      TopicArn: process.env.SNS_TOPIC_ARN,
      Subject: 'Nuevos datos de usuario recibidos'
    };

    // Verificar que el Topic ARN esté configurado
    if (!process.env.SNS_TOPIC_ARN) {
      return res.status(500).json({
        mensaje: 'Error: SNS_TOPIC_ARN no está configurado en las variables de entorno'
      });
    }

    // Publicar mensaje en SNS
    const resultado = await sns.publish(params).promise();

    console.log('Mensaje enviado a SNS:', {
      messageId: resultado.MessageId,
      topicArn: params.TopicArn,
      datos: { nombre, apellidos, email }
    });

    res.status(200).json({
      mensaje: 'Datos enviados exitosamente a SNS',
      messageId: resultado.MessageId,
      timestamp: mensaje.timestamp
    });

  } catch (error) {
    console.error('Error al enviar datos a SNS:', error);
    
    // Manejar diferentes tipos de errores de AWS
    if (error.code === 'InvalidParameter') {
      return res.status(400).json({
        mensaje: 'Error: Parámetros inválidos para SNS',
        detalles: error.message
      });
    }
    
    if (error.code === 'AuthorizationError' || error.code === 'AccessDenied') {
      return res.status(403).json({
        mensaje: 'Error: No tienes permisos para acceder al tópico SNS',
        detalles: error.message
      });
    }
    
    if (error.code === 'NotFound') {
      return res.status(404).json({
        mensaje: 'Error: El tópico SNS no fue encontrado',
        detalles: error.message
      });
    }

    res.status(500).json({
      mensaje: 'Error interno del servidor al enviar datos a SNS',
      error: process.env.NODE_ENV === 'development' ? error.message : 'Error interno'
    });
  }
};

const verificarConfiguracionSNS = async (req, res) => {
  try {
    const sns = configurarSNS();
    
    if (!process.env.SNS_TOPIC_ARN) {
      return res.status(500).json({
        mensaje: 'SNS_TOPIC_ARN no está configurado',
        configurado: false
      });
    }

    // Intentar obtener los atributos del tópico para verificar conectividad
    const params = {
      TopicArn: process.env.SNS_TOPIC_ARN
    };

    await sns.getTopicAttributes(params).promise();

    res.status(200).json({
      mensaje: 'Configuración de SNS válida',
      configurado: true,
      topicArn: process.env.SNS_TOPIC_ARN,
      region: process.env.AWS_REGION || 'us-east-1'
    });

  } catch (error) {
    console.error('Error al verificar configuración SNS:', error);
    
    res.status(500).json({
      mensaje: 'Error al verificar configuración de SNS',
      configurado: false,
      error: error.message
    });
  }
};

module.exports = {
  enviarDatosASNS,
  verificarConfiguracionSNS
};
