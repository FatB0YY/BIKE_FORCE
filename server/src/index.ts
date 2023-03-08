import * as dotenv from 'dotenv'
dotenv.config()
import express, { Express } from 'express'
import Sequelize from 'sequelize/types/sequelize'
const sequelize: Sequelize = require('./db')
const models = require('./models/models')
const cors = require('cors')
const router = require('./routes/index')
const errorHandler = require('./middleware/ErrorHandlingMiddleware')

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use('/api', router)
// в конце!
app.use(errorHandler)

const PORT = process.env.PORT

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`)
    })
  } catch (error: any) {
    console.log('error:', error.message)
    process.exit(1)
  }
}
start()
