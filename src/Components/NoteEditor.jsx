import React, { useState } from 'react';
import { Save } from 'lucide-react';

const NoteEditor = ({ notes, onSave }) => {
  const [title, setTitle] = useState(notes.title);
  const [content, setContent] = useState(notes.content);

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedNote = { 
      ...notes, 
      title: title.trim() || '', 
      content, 
      updatedAt: new Date().toISOString() 
    };
    onSave(updatedNote);
  };

  return (
    <form className="h-full flex flex-col" onSubmit={handleSubmit}>
      <div className="p-6 flex-1 flex flex-col">
        <input
          type="text"
          placeholder="Title"
          className="dark:placeholder-stone-300 placeholder-stone-700 block w-full text-2xl font-bold border-b dark:outline-none border-gray-200 dark:border-stone-500 focus:border-teal-500 mb-4 pb-2 p-2 dark:text-stone-100 "
          autoFocus
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Write Something..."
          className="flex-1 w-full dark:outline-none resize-none p-4 placeholder-stone-500 dark:placeholder-gray-200 text-gray-900 dark:text-stone-200"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        ></textarea>
      </div>
      <div className="border-t px-6 flex py-4 justify-end border-gray-200 dark:border-stone-500">
        <button
          type="submit"
          className="inline-flex items-center p-2 border-none rounded-md text-sm font-medium text-white bg-teal-500 hover:bg-teal-600 focus:outline-none transition-all duration-300 ease-in-out"
        >
          <Save className="mr-2" />
          Save
        </button>
      </div>
    </form>
  );
};

export default NoteEditor;