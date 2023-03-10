import { Sequelize } from 'sequelize'

const sequelize = new Sequelize(
  process.env.DB_NAME!, // название БД
  process.env.DB_USER!, // Админ
  process.env.DB_PASSWORD!, // Пароль
  {
    dialect: 'postgres',
    host: process.env.DB_HOST!,
    port: +process.env.DB_PORT!,
  }
)

export default sequelize
