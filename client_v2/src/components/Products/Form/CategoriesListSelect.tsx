import React, { FC } from 'react'
import { ICategory } from '../../../types/Category'

interface IPropsCategoriesSelectList {
  categories: ICategory[] | undefined
}

const CategoriesListSelect: FC<IPropsCategoriesSelectList> = ({ categories }) => {
  return (
    <>
      {categories !== undefined ? (
        categories.length ? (
          categories.map((category) => (
            <option
              key={category.id}
              value={category.id}
            >
              {category.name}
            </option>
          ))
        ) : (
          <option disabled>No categories</option>
        )
      ) : null}
    </>
  )
}

export default CategoriesListSelect
