import React from 'react'
// import single from '../assets'
// import double from '../assets'
// import triple from '../assets'

function Cards() {
  return (
    <div className='w-full py-[10rem] px-4 bg-white'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-3 gap-8'>
        
        <div className='w-full shadow-md flex flex-col  my-4 rounded-lg hover:scale-105 duration-300 ease-in-out'>
            <img src="" alt="/" className='w-20 mx-auto mt-[-3rem] bg-transparent' />

            <h2 className='text-2xl font-bold text-center py-8'>Single User</h2>
            <p className='text-center text-4xl font-bold'>$149</p>

            <div className='text-center font-medium'>
                <p className='py-2 border-b border-stone-200 mx-8 mt-8'>500GB Storage</p>
                <p className='py-2 border-b border-stone-200 mx-8 mt-8'>Granted User</p>
                <p className='py-2 border-b border-stone-200 mx-8 mt-8'>Send up to 2 GB</p>
            </div>

            <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>
        </div>

        <div className='w-full shadow-md flex flex-col  my-8 md:my-0 rounded-lg hover:scale-105 duration-300 ease-in-out bg-stone-100'>
            <img src="" alt="/" className='w-20 mx-auto mt-[-3rem] bg-transparent' />

            <h2 className='text-2xl font-bold text-center py-8'>Single User</h2>
            <p className='text-center text-4xl font-bold'>$149</p>

            <div className='text-center font-medium'>
                <p className='py-2 border-b border-stone-200 mx-8 mt-8'>500GB Storage</p>
                <p className='py-2 border-b border-stone-200 mx-8 mt-8'>Granted User</p>
                <p className='py-2 border-b border-stone-200 mx-8 mt-8'>Send up to to 2 GB</p>
            </div>

            <button className='bg-black w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-[#00df9a]'>Get Started</button>
        </div>
        
        <div className='w-full shadow-md flex flex-col  my-4 rounded-lg hover:scale-105 duration-300 ease-in-out'>
            <img src="" alt="/" className='w-20 mx-auto mt-[-3rem] bg-transparent' />

            <h2 className='text-2xl font-bold text-center py-8'>Single User</h2>
            <p className='text-center text-4xl font-bold'>$149</p>

            <div className='text-center font-medium'>
                <p className='py-2 border-b border-stone-200 mx-8 mt-8'>500GB Storage</p>
                <p className='py-2 border-b border-stone-200 mx-8 mt-8'>Granted User</p>
                <p className='py-2 border-b border-stone-200 mx-8 mt-8'>Send up to 2 GB</p>
            </div>

            <button className='bg-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto py-3 text-black'>Get Started</button>
        </div>

      </div>
    </div>
  )
}

export default Cards
