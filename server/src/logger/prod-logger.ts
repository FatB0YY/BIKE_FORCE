import winston from 'winston'
const { combine, timestamp, errors, json } = winston.format

function buildProdLogger() {
  return winston.createLogger({
    format: combine(timestamp(), errors({ stack: true }), json()),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: 'error-prod.log' }),
    ],
  })
}

export default buildProdLogger
