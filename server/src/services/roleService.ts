import ApiError from '../error/ApiError.js'
import { Role, UserRole } from '../models/models.js'
import { IUserAttributes } from '../models/IUser.js'
import { IRole } from '../models/IRole.js'
import { Model } from 'sequelize'

class RoleService {
  async getRolesFromDb(roles: IRole[]) {
    // находим роли в бд по value и id
    const rolesDb = await Role.findAll({
      where: {
        id: roles.map((role) => role.id),
        value: roles.map((role) => role.value),
      },
    })

    if (!rolesDb) {
      throw ApiError.BadRequest('Нет ролей!')
    }

    if (rolesDb.length !== roles.length) {
      const missingRoles = roles.filter((role) => !rolesDb.find((dbRole: any) => dbRole.id === role.id))

      throw ApiError.BadRequest(`Роли ${missingRoles.map((role) => role.value).join(', ')} не найдены в базе данных`)
    }

    return rolesDb
  }

  async saveUserRoleTable(rolesDb: Model[], user: IUserAttributes) {
    const userRoles = rolesDb.map((role: any) => {
      return {
        UserId: user.id,
        RoleId: role.id,
      }
    })

    return userRoles
  }

  async addRole(user: any, roles: IRole[]) {
    // находим роли в бд по value и id
    const rolesDb = await Role.findAll({
      where: {
        id: roles.map((role) => role.id),
        value: roles.map((role) => role.value),
      },
    })

    if (rolesDb.length !== roles.length) {
      const missingRoles = roles.filter((role) => !rolesDb.find((dbRole: any) => dbRole.id === role.id))

      throw ApiError.BadRequest(`Роли ${missingRoles.map((role) => role.value).join(', ')} не найдены в базе данных`)
    }

    // Добавляем роли для пользователя
    for (const role of roles) {
      const roleCandidate = await UserRole.findOne({ where: { UserId: user.id, RoleId: role.id } })

      if (!roleCandidate) {
        await UserRole.create({ UserId: user.id, RoleId: role.id })
      }
    }
  }

  async getUserRoles(userId: number) {
    // Находим все записи таблицы UserRole, связанные с данным userId
    const userRoles = await UserRole.findAll({ where: { UserId: userId } })

    // Получаем массив ролей пользователя, используя их идентификаторы
    const roleIds = userRoles.map((userRole: any) => userRole.RoleId)

    const roles = await Role.findAll({
      where: { id: roleIds },
    })

    return roles
  }
}

export default new RoleService()
