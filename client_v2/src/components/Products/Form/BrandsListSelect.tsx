import React, { FC } from 'react'
import { IBrand } from '../../../types/Brand'

interface IPropsBrandsSelectList {
  brands: IBrand[] | undefined
}

const BrandsListSelect: FC<IPropsBrandsSelectList> = ({ brands }) => {
  return (
    <>
      {brands !== undefined ? (
        brands.length ? (
          brands.map((brand) => (
            <option
              key={brand.id}
              value={brand.id}
            >
              {brand.name}
            </option>
          ))
        ) : (
          <option disabled>No brands</option>
        )
      ) : null}
    </>
  )
}

export default BrandsListSelect
