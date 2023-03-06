import { Sequelize, Model, DataTypes } from 'sequelize'

// const sequelize = new Sequelize('sqlite::memory:')
// const User = sequelize.define('User', {
//   username: DataTypes.STRING,
//   birthday: DataTypes.DATE,
// })

if (
  process.env.DB_NAME &&
  process.env.DB_USER &&
  process.env.DB_PASSWORD &&
  process.env.DB_PORT
) {
  module.exports = new Sequelize(
    process.env.DB_NAME, // название БД
    process.env.DB_USER, // Админ
    process.env.DB_PASSWORD, // Пароль
    {
      dialect: 'postgres',
      host: process.env.DB_HOST,
      port: +process.env.DB_PORT,
    }
  )
} else {
  console.log('environment variable error')
}
