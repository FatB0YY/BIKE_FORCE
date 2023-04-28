import React from 'react'
import HeroImage from '../img/bikeforce.png'
import Link from 'next/link'

const Hero = () => {
  return (
    <section className='h-[800px] bg-hero bg-no-repeat bg-cover bg-center py-24'>
      <div className='container mx-auto flex justify-between h-full items-center'>
        {/* text */}
        <div className='flex flex-col justify-center'>
          {/* pretitle */}
          <div className='font-semibold flex items-center uppercase text-[#E4322C]'>
            <div className='w-10 h-[2px] bg-[#E4322C] mr-3'></div>New Trend
          </div>
          {/* title */}
          <h1 className='text-[70px] leading-[1.1] font-light mb-4'>BIKE FORCE</h1>
          <Link
            href={'/'}
            as={'/'}
            className='self-start uppercase font-semibold border-b-2 border-primary '
          >
            Discover More
          </Link>
        </div>
        {/* image */}
        <div className='hidden lg:block'>
          <img
            src={HeroImage.src}
            alt=''
            className='w-[350px]'
          />
        </div>
      </div>
    </section>
  )
}

export default Hero
