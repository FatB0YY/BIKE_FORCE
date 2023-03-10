import * as dotenv from 'dotenv'
dotenv.config()
import express, { Express } from 'express'
import sequelize from './db'
import * as model from './models/models'
import router from './routes'
import apiErrorHandler from './middleware/ErrorHandlingMiddleware'
import fileUpload from 'express-fileupload'
import path from 'path'
const cors = require('cors')

const app: Express = express()

app.use(cors())
app.use(express.json())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(fileUpload({}))
app.use('/api', router)
// в конце!
app.use(apiErrorHandler)

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
