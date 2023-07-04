import React from 'react'
import { useGetAllBrandsQuery } from '../../service/BrandsAPI'
import BrandsListItem from './BrandsListItem'
import Spinner from '../Spinner'

const BrandsList = () => {
  // rtk query
  const { data: brands, isLoading: isLoadingGetAllBrands } = useGetAllBrandsQuery()

  if (isLoadingGetAllBrands) {
    return <Spinner />
  }

  return (
    <>
      {brands &&
        brands.map((brand) => (
          <BrandsListItem
            key={brand.id}
            brand={brand}
          />
        ))}
    </>
  )
}

export default BrandsList
