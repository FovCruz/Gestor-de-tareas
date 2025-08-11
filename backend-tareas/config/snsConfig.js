const AWS = require('aws-sdk');

// Configurar AWS
const configurarSNS = () => {
  AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    region: process.env.AWS_REGION || 'us-east-1'
  });

  return new AWS.SNS({ apiVersion: '2010-03-31' });
};

module.exports = configurarSNS;
