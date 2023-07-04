import { DataTypes } from 'sequelize'
import sequelize from '../db.js'

const User = sequelize.define('User', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true, allowNull: false },
  email: { type: DataTypes.STRING, unique: true },
  password: { type: DataTypes.STRING },
  isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
  isBan: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false },
  banReason: { type: DataTypes.STRING, defaultValue: null },
})

const Role = sequelize.define('Role', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  value: { type: DataTypes.STRING, unique: true, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
})

const Token = sequelize.define('Token', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  refreshToken: { type: DataTypes.STRING, unique: true, allowNull: false },
})

const Basket = sequelize.define('Basket', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const BasketProduct = sequelize.define('BasketProduct', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  img: { type: DataTypes.STRING, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
})

const Category = sequelize.define('Category', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
})

const Brand = sequelize.define('Brand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, unique: true, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
})

const ProductInfo = sequelize.define('ProductInfo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  title: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  isActive: { type: DataTypes.BOOLEAN, allowNull: false, defaultValue: true },
})

const CategoryBrand = sequelize.define('CategoryBrand', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

const UserRole = sequelize.define('UserRole', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
})

User.hasOne(Token)
Token.belongsTo(User)

User.hasOne(Basket)
Basket.belongsTo(User)

Basket.hasMany(BasketProduct)
BasketProduct.belongsTo(Basket)

Category.hasMany(Product)
Product.belongsTo(Category)

Brand.hasMany(Product)
Product.belongsTo(Brand)

Product.hasMany(BasketProduct)
BasketProduct.belongsTo(Product)

Product.hasMany(ProductInfo, { as: 'info' })
ProductInfo.belongsTo(Product)

Category.belongsToMany(Brand, { through: CategoryBrand })
Brand.belongsToMany(Category, { through: CategoryBrand })

User.belongsToMany(Role, { through: UserRole })
Role.belongsToMany(User, { through: UserRole })

export { User, Basket, Brand, BasketProduct, Category, CategoryBrand, Product, ProductInfo, Token, UserRole, Role }
