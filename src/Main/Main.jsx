import React from 'react'
import { useEffect, useState } from 'react';
import {Header, ReuseButton, NoteEditor, EmptyState, NoteList} from '../Components'
import {Edit, Search, Trash2, X,} from 'lucide-react'

const Main = () => {
  // useEffect(() => {
  //     document.body.style.backgroundColor = '';
  
  //     return () => {
  //         document.body.style.backgroundColor = '';
  //     };
  // }, []);

  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem('notes');
    return savedNotes ? JSON.parse(savedNotes) : [];
  });

  const [activeNote, setActiveNote] = useState(null)
  const [isEditing, setIsEditing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
  localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const filteredNotes = notes.filter((note) => note.title.toLowerCase().includes(searchQuery.toLowerCase()) || note.content.toLowerCase().includes(searchQuery.toLowerCase()));

  const handleAddNote = () => {
    const newNote = {
      id: Date.now().toString(),
      title: 'Untitled Note',
      content: '',
      createdAt: new Date().toISOString(),
      UpdatedAt: new Date().toISOString(),
    }
    setNotes([newNote, ...notes])
    setActiveNote(newNote)
    setIsEditing(true)
  }

  const handleUpdatedNote = (updatedNote) => {
    setNotes(notes.map((note) => note.id === updatedNote.id ? {...updatedNote, updatedAt: new Date().toISOString()} : note));
    setActiveNote(updatedNote)
    setIsEditing(false)
  }




  const handleDeleteNote = (id) => {
    setNotes(notes.filter((note) => note.id !== id))
    if (activeNote && activeNote.id === id){
      setActiveNote(null)
    }
  }

  return (
    <div className='min-h-screen bg-gray-50 flex flex-col dark:bg-ArtisansAsh-100'>
        <Header addNote={handleAddNote}/>

        <div className="flex-1 flex overflow-hidden">
          <div className="w-80 border-r border-gray-200 dark:border-none bg-white dark:bg-ArtisansAsh-200 overflow-y-auto">
            <div className="p-4">
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className='h-5 w-5 text-gray-400 dark:text-gray-50' />
                </div>

                <input type="text" placeholder='Search Notes.....' className='block w-full pl-10 pr-3  rounded-md leading-5 bg-teal-50 border border-stone-300 py-3 placeholder-gray-500 
                dark:border-none focus:outline-stone-300
                dark:focus:outline-none
                 dark:bg-ArtisansAsh-100 dark:text-gray-200 dark:placeholder-gray-300' 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>

 
            {/* SideBar */}
            {filteredNotes.length > 0 ? (<NoteList 
            notes={filteredNotes} 
            activeNoteId={activeNote?.id} onSelectNote={setActiveNote} 
            onDelete={handleDeleteNote}/>) : (
              <div className="p-4 text-center text-gray-500 dark:text-gray-300">
                {searchQuery ? 'No notes found' : 'No notes available. Click the button below to add a new note.'}
              </div>
            )}
          </div>

          {/* Main Content */}
          <div className="flex-1 overflow-y-auto ">
            {activeNote ? ( <div className="h-full flex flex-col ">
              <div className="border-b border-gray-200 dark:border-stone-500 px-6 py-4 flex justify-between items-center">
                <h2 className='text-lg font-medium text-gray-900 dark:text-gray-300'>Note Title</h2>
              <div className="flex space-x-2">
                {isEditing ? (<ReuseButton Sign={<X className='h-4 w-4'/>} handleClick={setIsEditing} value={false}/>) : 
                <>
                <ReuseButton Sign={<Edit className='h-4 w-4'/>} handleClick={setIsEditing} value={true}/>
                  <ReuseButton Sign={<Trash2 className='h-4 w-4'/>} handleClick={handleDeleteNote}
                  value={activeNote.id}
                  />
                </>}
                
              </div>
              </div>
              {isEditing ? <NoteEditor notes={activeNote} onSave={handleUpdatedNote}/> : <div className='p-6'>
                <div className="prose max-sm-none">
                  <h1 className='dark:text-stone-100 text-lg font-black'>{activeNote.title}</h1>
                  <p className='text-sm text-gray-500 mb-4 dark:text-stone-300'>Last Updated: {new Date(activeNote.updatedAt).toLocaleString() } </p>
                </div>
                <div className="whitespace-pre-wrap text-gray-700 dark:text-stone-300">
                  {activeNote.content}
                </div>
              </div> }
              
            </div>) : <EmptyState addNoteApp={handleAddNote}/>}
          </div>
        </div>
    </div>
  );
}

export default Main
