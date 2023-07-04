import { useGetAllCategoriesQuery } from '../../service/CategoriesAPI'
import Spinner from '../Spinner'
import CategoriesListItem from './CategoriesListItem'

const CategoriesList = () => {
  // rtk query
  const { data: categories, isLoading: isLoadingGetAllCategories } = useGetAllCategoriesQuery()

  if (isLoadingGetAllCategories) {
    return <Spinner />
  }

  return (
    <>
      {categories &&
        categories.map((category) => (
          <CategoriesListItem
            key={category.id}
            category={category}
          />
        ))}
    </>
  )
}

export default CategoriesList
