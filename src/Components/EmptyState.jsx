import { Plus, FileText } from 'lucide-react'
import React from 'react'

const EmptyState = ({addNoteApp}) => {
  return (
    <div className='h-full flex flex-col items-center justify-center p-12 text-cneter'>
      <FileText className="h-16 w-16 dark:text-white text-gray-400 mb-4"/>
      <h3 className='text-lg font-medium text-gray-900 dark:text-gray-100'>
        No Notes Selected Yet..
      </h3>
      <p className='mt-1 text-sm dark:text-gray-100  text-gray-500 max-w-md '>
        Select a note from the sidebar or Create a New One.
      </p>
      <div className="mt-6">
        <button type='button' className='inline-flex items-center p-2 px-4 shadow-sm rounded-md text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none transition-all duration-300 ease-in-out'
        onClick={addNoteApp}
        >
            <Plus className='mr-2'/>
            New Note
          </button>
      </div>
    </div>
  )
}

export default EmptyState
