import * as dotenv from 'dotenv'
dotenv.config({ path: `.${process.env.NODE_ENV}.env` })

import express, { Express, json } from 'express'
import * as model from './models/models.js'
import cookieParser from 'cookie-parser'
import router from './routes/index.routes.js'
import apiErrorHandler from './error/apiErrorHandler.js'
import path from 'path'
import cors from 'cors'
import logger from './logger/index.js'
import fileDirName from './utils/fileDirName.js'
import formData from 'express-form-data'
import sequelize from './db.js'
import bcrypt from 'bcrypt'

const { __dirname, __filename } = fileDirName(import.meta)
const app: Express = express()

app.use(
  cors({
    credentials: true,
    origin: process.env.CLIENT_URL || '*',
  }),
)
app.use(json())
app.use(formData.parse())
app.use(cookieParser())
app.use(express.static(path.resolve(__dirname, 'static')))
app.use('/api', router)
app.use(apiErrorHandler)

const PORT = process.env.PORT

const start = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync()

    // Проверяем наличие роли ADMIN
    const adminRole = await model.Role.findOne({ where: { value: 'ADMIN' } })
    if (!adminRole) {
      // Если роли нет, то добавляем ее
      await model.Role.create({ value: 'ADMIN', description: 'Администратор' })
      console.log('Role ADMIN has been created')
    }

    // Проверяем наличие пользователей
    const users = await model.User.findAll()
    if (users.length === 0) {
      // Если пользователей нет, то добавляем нового пользователя с ролью ADMIN
      const password = process.env.ADMIN_PASSWORD // Получаем пароль из .env файла
      const email = process.env.ADMIN_EMAIL // Получаем почту из .env файла

      // bcrypt
      const salt = await bcrypt.genSalt()
      const hashPassword = await bcrypt.hash(password.toString(), salt)

      await model.User.create({
        id: 1,
        email,
        password: hashPassword,
      })

      // Связываем пользователя с ролью ADMIN
      await model.UserRole.create({
        id: 1,
        UserId: 1,
        RoleId: 1,
      })
      console.log('Admin user has been created')
    }

    app.listen(PORT, () => {
      console.log(`Server is running on port: ${PORT}`)
    })
  } catch (error: unknown) {
    logger.error(error)
    process.exit(1)
  }
}
start()
