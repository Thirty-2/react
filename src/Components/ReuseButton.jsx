import React from 'react'

const ReuseButton = ({Sign, handleClick, value}) => {
  return (
    <button type='button' className='inline-flex items-center p-2 rounded-md text-sm font-medium text-gray-700 dark:text-teal-500  dark:hover:bg-stone-800 hover:bg-teal-100 focus:outline-none dark:hover:text-white transition-all duration-300 ease-in-out' onClick={() => handleClick(value)}>
        {Sign}
    </button>
  )
}

export default ReuseButton
