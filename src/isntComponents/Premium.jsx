import React from 'react'
import {SmileIcon, Check} from 'lucide-react'

const Premium = () => {
  return (
    <div className='bg-stone-100 mb-10'>
      <div className="p-12 space-y-20">
        
        <div className="text-center w-full">
          <h1 className='text-xl text-slate-900 font-bold'>Friendly Tip</h1>
          <div className=''>
          <p className='text-slate-600'>Build a Solid Reputation Before Paying For The Premium Version</p>
          </div>
        </div>

        <div className="mx-auto grid grid-cols-1 min-lg:grid-cols-3 w-fit gap-20">

          <div className="shadow-md py-10 px-6 rounded-t-xl min-lg:rounded-l-xl min-lg:rounded-t-none flex flex-col items-center bg-white gap-14 hover:scale-105 duration-500 ease-in-out">

  <div className="flex flex-col items-center gap-2">
  <h1 className='text-ArtisansBlue text-3xl font-semibold'>Monthly</h1>
  <p className='text-stone-400'>{"(Per Month)"}</p>
  <p className='flex items-center gap-1'><p className='text-3xl font-semibold text-slate-600'>$10</p>/ month</p>
  </div>

  <nav className='list-none'>
    <li className='flex gap-2'>Individual Advertisment < Check/></li>
  </nav>

  <div
    className="bg-ArtisansBlue text-white rounded-lg px-5 shadow-md py-2 w-fit mx-auto md:m-0 hover:bg-ArtisansBlue-100 transition-colors duration-500 ease-in-out cursor-pointer"
  >
    Subscribe!
  </div>
          </div>

          <div className="shadow-md py-10 px-6  flex flex-col items-center bg-blue-50 gap-14 hover:scale-120 scale-110 duration-500 ease-in-out">

            <div className="flex flex-col items-center gap-2">
            <h1 className='text-ArtisansBlue text-3xl font-semibold'>Free Trail</h1>
            <p className='text-stone-400'>{"(3 Month)"}</p>
            <p className='flex items-center gap-1 text-stone-500'><p className='text-3xl font-semibold text-slate-600'>$0</p>/ month</p>
            <p className='w-[15rem] text-stone-900 text-center text-sm font-thin'>
              Not Sure if it's worth it?
              Try It For Free For 3 Months 
              You Might Just Change Your Mind.
            </p>

            </div>

            <nav className='list-none'>
              <li className='flex gap-2'>Individual Advertisment < Check/></li>
            </nav>

            <div
              className="bg-ArtisansBlue text-white rounded-lg px-5 shadow-md py-2 w-fit mx-auto md:m-0 hover:bg-ArtisansBlue-100 transition-colors duration-500 ease-in-out cursor-pointer animate-bounce "
            >
              Start Free Trail!
            </div>
          </div>

          <div className="shadow-md py-10 px-6 rounded-b-xl min-lg:rounded-r-xl min-lg:rounded-bl-none flex flex-col items-center bg-white gap-14 hover:scale-105 duration-500 ease-in-out">

            <div className="flex flex-col items-center gap-2">
            <h1 className='text-ArtisansBlue text-3xl font-semibold'>Annually</h1>
            <p className='text-stone-400'>{"(Per Year)"}</p>
            <p className='flex items-center gap-1'><p className='text-3xl font-semibold text-slate-600'>$100</p>/ year</p>
            </div>

            <nav className='list-none'>
              <li className='flex gap-2'>Individual Advertisment < Check/></li>
            </nav>

            <div
              className="bg-ArtisansBlue text-white rounded-lg px-5 shadow-md py-2 w-fit mx-auto md:m-0 hover:bg-ArtisansBlue-100 transition-colors duration-500 ease-in-out cursor-pointer"
            >
              Subscribe!
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

export default Premium
