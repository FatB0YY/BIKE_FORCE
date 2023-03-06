import * as dotenv from 'dotenv'
dotenv.config()
import express, { Express } from 'express'
import Sequelize from 'sequelize/types/sequelize'
const sequelize: Sequelize = require('./db')

const app: Express = express()
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
