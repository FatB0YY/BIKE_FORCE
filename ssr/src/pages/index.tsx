import Footer from '@/components/Footer'
import Hero from '@/components/Hero'
import Loader from '@/components/Loader'
import MainLayout from '@/components/MainLayout'
import Pagination from '@/components/Pagination'
import ProductList from '@/components/ProductList'
import Sidebar from '@/components/Sidebar'
import Tabs from '@/components/Tabs'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'
import { setTotalCount } from '@/redux/reducers/UserSlice'
import UserService from '@/services/UserService'
import { IIndexPageProps } from '@/types'
import { NextPageContext } from 'next'
import { useEffect, useState } from 'react'

const HomePage = ({
  products: serverProducts,
  tabsBrand: serverTabsBrand,
  tabsCategory: serverTabsCategory,
}: IIndexPageProps) => {
  const [products, setProducts] = useState(serverProducts)
  const [tabsBrand, setTabsBrand] = useState(serverTabsBrand)
  const [tabsCategory, setTabsCategory] = useState(serverTabsCategory)
  const { tabBrandId, tabCategoryId, page } = useAppSelector((state) => state.UserReducer)
  const dispatch = useAppDispatch()

  useEffect(() => {
    async function load() {
      const responseProduct = await UserService.getAllProduct(
        tabBrandId,
        tabCategoryId,
        Number(process.env.LIMIT_PRODUCT_ON_LIST)!,
        page,
      )

      setProducts(responseProduct.data)
    }

    load()
  }, [tabBrandId, tabCategoryId, page])

  useEffect(() => {
    async function load() {
      const responseBrand = await UserService.getAllBrand()
      const responseCategory = await UserService.getAllCategory()

      setTabsBrand(responseBrand.data)
      setTabsCategory(responseCategory.data)
    }

    if (!serverTabsBrand || !serverTabsCategory) {
      load()
    }
  }, [])

  useEffect(() => {
    // сколько всего продуктов мы получили
    dispatch(setTotalCount(serverProducts.count))
  }, [serverProducts])

  if (!products || !tabsBrand || !tabsCategory) {
    return (
      <MainLayout title='Home Page'>
        <Hero />
        <Loader />
        <Sidebar />
        <Footer />
      </MainLayout>
    )
  }

  return (
    <MainLayout title='Home Page'>
      <Hero />
      <Tabs
        value='brand'
        tabs={tabsBrand}
      />
      <Tabs
        value='category'
        tabs={tabsCategory}
      />
      <ProductList
        products={products.rows}
        brands={tabsBrand}
        categories={tabsCategory}
      />
      <Pagination />
      <Sidebar />
    </MainLayout>
  )
}

export async function getServerSideProps(context: NextPageContext) {
  if (!context.req) {
    return {
      products: null,
      tabsBrand: null,
      tabsCategory: null,
    }
  }

  const responseProduct = await UserService.getAllProduct(null, null, Number(process.env.LIMIT_PRODUCT_ON_LIST)!, 1)
  const responseBrand = await UserService.getAllBrand()
  const responseCategory = await UserService.getAllCategory()

  const products = responseProduct.data
  const tabsBrand = responseBrand.data
  const tabsCategory = responseCategory.data

  return { props: { products, tabsBrand, tabsCategory } }
}

export default HomePage
