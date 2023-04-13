import ApiError from '../error/ApiError.js'
import { Role, UserRole } from '../models/models.js'
import { IUserAttributes } from '../models/IUser.js'
import { IRole } from '../models/IRole.js'
import { Model } from 'sequelize'

class RoleService {
  async getRolesFromDb(roles: IRole[]) {
    const rolesDb = await Role.findAll({ where: { id: roles.map((role) => role.id) } })

    if (!rolesDb) {
      throw ApiError.BadRequest('У пользователя нет ролей!')
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
    // Проверяем наличие ролей в базе данных
    const dbRoles = await Role.findAll({ where: { id: roles.map((role) => role.id) } })

    if (dbRoles.length !== roles.length) {
      const missingRoles = roles.filter((role) => !dbRoles.find((dbRole: any) => dbRole.id === role.id))

      throw ApiError.BadRequest(`Роли ${missingRoles.map((role) => role.value).join(', ')} не найдены в базе данных`)
    }

    // Добавляем роли для пользователя
    for (const role of roles) {
      await UserRole.create({ UserId: user.id, RoleId: role.id })
    }
  }
}

export default new RoleService()
