import { body } from 'express-validator'

const roleValidation = [
  body('value').trim().exists({ checkFalsy: true, checkNull: true }).withMessage('Обязательное поле!').isUppercase(),
  body('description')
    .trim()
    .exists({ checkFalsy: true, checkNull: true })
    .withMessage('Обязательное поле!')
    .isUppercase(),
]

export default roleValidation
