import React from 'react'
import { Trash2 } from 'lucide-react'

const NoteList = ({notes, activeNoteId, onSelectNote, onDelete}) => {
  return (
  <div className="mx-4 ">
    {notes.map((note) => {

      const isActive = note.id === activeNoteId;
      const updatedDate = new Date(note.updatedAt);

      return (
        <div className={`p-4 cursor-pointer hover:bg-teal-100  mt-2 group rounded-md ${isActive ? 'bg-teal-50' : "dark:text-stone-200" }`} key={note.id} >

      <div className="flex justify-between">
        <div className="flex-1" onClick={() => onSelectNote(note)}>


          <h3 className='text-sm font-medium dark:group-hover:text-black '>
            {note.title}
          </h3>
          <p className="text-xs mt-1 font-medium dark:group-hover:text-stone-800">
            {updatedDate.toLocaleTimeString([], {hour: "2-digit", minute: "2-digit" })} - {updatedDate.toLocaleDateString([], {
            year: "numeric",
            month: "2-digit",
            day: "2-digit"
          })}</p>
          <p className="mt-1 text-xs text-gray-500 dark:group-hover:text-gray-700">
            {note.content}
          </p>
        </div>
        <button className="ml-2  text-gray-700 hover:text-gray-950 cursor-pointer" onClick={(e) => {
          e.stopPropagation();
          onDelete(note.id)
        }}>
          <Trash2 className="h-5 w-5 " />
        </button>
      </div>
    </div>
      )
    })}
  </div>
  );
}

export default NoteList
