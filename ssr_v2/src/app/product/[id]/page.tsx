import { Metadata } from 'next'
import UserService from '@/services/UserService'
import MyButton from '@/components/client/MyButton'
import { IProduct } from '@/types'

type Props = {
  params: {
    id: number
  }
}

async function getProductDetails(id: number): Promise<IProduct> {
  const product = await UserService.getOneProduct(id)
  return product
}

export async function generateMetadata({ params: { id } }: Props): Promise<Metadata> {
  const product = await getProductDetails(id)
  return {
    title: `BIKE FORCE | ${product.name} details`,
  }
}

const ProductDetails = async ({ params: { id } }: Props) => {
  const product = await getProductDetails(id)

  return (
    <section className='pt-32 pb-12 lg:py-32 h-screen flex items-center'>
      <div className='container mx-auto'>
        {/* image & wrapper */}
        <div className='flex flex-col lg:flex-row items-center'>
          {/* image */}
          <div className='flex flex-1 justify-center items-center mb-8 lg:mb-0'>
            <img
              className='max-w-[200px] lg:max-w-sm'
              src={`${process.env.API_URL_WITHOUT_API!}${product.img}`}
              alt={product.name}
            />
          </div>
          {/* text */}
          <div className='flex-1 text-center lg:text-left'>
            <h1 className='text-[26px] font-medium mb-2 max-2-[450px] mx-auto lg:mx-0'>{product.name}</h1>
            <div className='text-xl text-red-500 font-medium mb-6 '>$ {product.price}</div>

            <div className='max-w-lg'>
              {product.info?.map((item: any) => {
                return (
                  <div
                    key={item.id}
                    className='flex items-center justify-between'
                  >
                    <span className='mb-8'>{item.title}: </span>
                    <span className='mb-8'>{item.description}</span>
                  </div>
                )
              })}
            </div>

            <MyButton product={product} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default ProductDetails
