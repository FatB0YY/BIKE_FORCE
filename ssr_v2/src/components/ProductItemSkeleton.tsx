const ProductItemSkeleton = () => {
  return (
    <div className='w-[311px] bg-white group cursor-wait rounded-xl border p-3 space-y-4 animate-pulse'>
      <div className='aspect-square rounded-xl bg-gray-100 relative'>
        {/* Заглушка для изображения */}
        <div className='w-full h-0 aspect-square bg-gray-200'></div>

        {/* Заглушка для кнопок */}
        <div className='opacity-100 transition absolute w-full px-6 bottom-5'>
          <div className='flex gap-x-6 justify-center'>
            <div className='w-10 h-10 bg-gray-200 rounded-full'></div>
            <div className='w-10 h-10 bg-gray-200 rounded-full'></div>
          </div>
        </div>
      </div>
      {/* Заглушка для категории, бренда, названия и цены */}
      <div>
        <div className='w-24 h-4 bg-gray-200 mb-1'></div>
        <div className='w-20 h-4 bg-gray-200 mb-1'></div>
        <div className='w-40 h-6 bg-gray-200 mb-1'></div>
        <div className='w-20 h-4 bg-gray-200'></div>
      </div>
    </div>
  )
}

export default ProductItemSkeleton
