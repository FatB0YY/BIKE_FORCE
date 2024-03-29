import Link from 'next/link'
import LogoImage from '@/img/logo.svg'
import NextImage from 'next/image'
import CartInHeader from '@/components/Header/CartInHeader'
import Navigation from '@/components/Header/Navigation'

const Header = () => {
  return (
    <header className='bg-white py-2 shadow-md fixed w-full z-10 transition-all'>
      <div className='container mx-auto flex items-center justify-between h-full'>
        {/* logo */}
        <Link
          href={`/`}
          as={`/`}
        >
          <div>
            <NextImage
              width={50}
              src={LogoImage}
              alt='BIKE FORCE'
            />
          </div>
        </Link>

        <Navigation />

        <CartInHeader />
      </div>
    </header>
  )
}

export default Header
