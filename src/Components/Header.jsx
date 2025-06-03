import React from 'react'
import {Logo, TealLogo, TealLogoDark} from '../assets/images'
import {Plus} from 'lucide-react'
import {useState} from 'react'

const Header = ({addNote}) => {

  return (
    <header className='bg-white dark:bg-ArtisansAsh-300 shadow-sm'>
      <div className="mx-auto px-4 sm:px-6 ">
        <div className="flex justify-between items-center">
          <h1 className=''>
            <img
        src={TealLogo}
        alt="Teal Logo"
        width={120}
        className="dark:hidden"
      />
      <img
        src={TealLogoDark}
        alt="Teal Logo Dark"
        width={120}
        className="hidden dark:block"
      />
          </h1>
          <button className='inline-flex items-center px-4 py-2 border border-transparent rounded-md shadown-sm text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 transition-colors duration-300 ease-in-out focus:outline-none focus:ring-2 cursor-pointer gap-2' onClick={addNote}>
            New Note
            <Plus />
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header
