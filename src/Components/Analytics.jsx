import React from 'react'
import laptop from '../assets/laptop.jpg'

function Analytics() {
  return (
    <div className='w-full bg-white py-16 px-4'>
      <div className='max-w-[1240px] mx-auto grid md:grid-cols-2'>
        <img className='w-[500px] mx-auto my-4' src={laptop} alt="/" />

        <div className='flex flex-col justify-center'>
            <p className='text-[#00df9a] font-bold '>DATA ANALYTICS DASHBOARD</p>
            <h1 className='md:text-4xl sm:text-3xl text-2xl py-2 font-bold'>Manage Data Analytics Centrally</h1>
            <p className='text-stone-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Libero veritatis corrupti quis consequatur repudiandae, consequuntur labore? Eveniet non molestiae illum, fugiat voluptatum commodi laborum, a cupiditate consectetur consequuntur iste. Numquam?</p>
            <button className=' bg-black text-[#00df9a] w-[200px] rounded-md font-medium my-6 mx-auto md:mx-0 py-3'>Get Started</button>
        </div>
        
      </div>
    </div>
  )
}

export default Analytics
