# Table of Contents

1. [Note-Taking Application](#note-taking-application)
2. [Features](#features)
3. [Installation](#installation)
    1. [Clone the Repository](#1-clone-the-repository)
    2. [Install the Dependencies](#2-install-the-dependencies)
    3. [Start the Application](#3-start-the-application)
4. [Components](#components)
    1. [NoteForm Component](#noteform-component)
        - [Code](#code)
    2. [Note Component](#note-component)
        - [Code](#code-1)
    3. [NoteList Component](#notelist-component)
        - [Code](#code-2)
5. [Redux Actions](#redux-actions)
    - [Code](#code-3)
6. [Run the Application Locally](#run-the-application)
7. [Deploy](#deployment)


## Note-Taking Application

This is a simple note-taking application built with React and Redux. The application allows users to create, view, pin, delete, edit notes, and change their background color or add images. Access the deployed app from here https://itika1.github.io/note-taking-app/


## Features

- Create a note with an optional title, content, background color, and image.
- View all created notes in a four-column layout.
- Pin notes to keep them at the top.
- Edit and delete notes.
- Change the background color and add an image to the notes.
- Persist notes using Redux for state management.

## Installation

### 1. Clone the Repository:

    ```bash
    git clone https://github.com/itika1/note-taking-app.git
    cd note-taking-app
    ```

### 2. Install the dependencies:

    ```bash
    npm install
    ```

### 3. Start the application:

    ```bash
    npm start
    ```

## Components

### NoteForm Component

The NoteForm component is responsible for creating new notes. It includes input fields for the title, content, background color, and an image.

#### Code

```import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../actions/noteActions';

const NoteForm = () => {
  const [note, setNote] = useState({ title: '', content: '', color: '', image: null });
  const dispatch = useDispatch();

  const handleAddNote = () => {
    dispatch(addNote(note));
    setNote({ title: '', content: '', color: '', image: null });
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Title"
        value={note.title}
        onChange={(e) => setNote({ ...note, title: e.target.value })}
      />
      <textarea
        placeholder="Take a note..."
        value={note.content}
        onChange={(e) => setNote({ ...note, content: e.target.value })}
      />
      <input
        type="color"
        value={note.color}
        onChange={(e) => setNote({ ...note, color: e.target.value })}
      />
      <input
        type="file"
        onChange={(e) => setNote({ ...note, image: URL.createObjectURL(e.target.files[0]) })}
      />
      <button onClick={handleAddNote}>Add Note</button>
    </div>
  );
};

export default NoteForm;

```

### Note Component

The Note component displays an individual note and allows users to edit, delete, and pin the note.

#### Code
```import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { editNote, deleteNote, pinNote } from '../actions/noteActions';

const Note = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedNote, setEditedNote] = useState(note);
  const dispatch = useDispatch();

  const handleEdit = () => {
    dispatch(editNote(editedNote));
    setIsEditing(false);
  };

  return (
    <div style={{ backgroundColor: note.color }}>
      {isEditing ? (
        <>
          <input
            type="text"
            value={editedNote.title}
            onChange={(e) => setEditedNote({ ...editedNote, title: e.target.value })}
          />
          <textarea
            value={editedNote.content}
            onChange={(e) => setEditedNote({ ...editedNote, content: e.target.value })}
          />
          <button onClick={handleEdit}>Save</button>
        </>
      ) : (
        <>
          <h4>{note.title}</h4>
          <p>{note.content}</p>
          {note.image && <img src={note.image} alt="note" />}
        </>
      )}
      <button onClick={() => setIsEditing(!isEditing)}>Edit</button>
      <button onClick={() => dispatch(deleteNote(note.id))}>Delete</button>
      <button onClick={() => dispatch(pinNote(note.id))}>
        {note.pinned ? 'Unpin' : 'Pin'}
      </button>
    </div>
  );
};

export default Note;

```

### NoteList Component
The NoteList component displays the list of notes, separating pinned notes from others.

#### Code

```import React from 'react';
import { useSelector } from 'react-redux';
import Note from './Note';

const NoteList = () => {
  const notes = useSelector((state) => state.notes);

  const pinnedNotes = notes.filter((note) => note.pinned);
  const otherNotes = notes.filter((note) => !note.pinned);

  return (
    <div>
      {pinnedNotes.length > 0 && (
        <div>
          <h2>Pinned</h2>
          <div>
            {pinnedNotes.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
      {otherNotes.length > 0 && (
        <div>
          <h2>Others</h2>
          <div>
            {otherNotes.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default NoteList;

```

### Redux Actions
The reducer manages the state changes based on actions.

#### Code

```const initialState = {
  notes: [],
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_NOTE':
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    case 'EDIT_NOTE':
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload.id ? action.payload : note
        ),
      };
    case 'DELETE_NOTE':
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case 'PIN_NOTE':
      return {
        ...state,
        notes: state.notes.map((note) =>
          note.id === action.payload ? { ...note, pinned: !note.pinned } : note
        ),
      };
    default:
      return state;
  }
};

export default noteReducer;

```

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Run the Application

#### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

#### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

#### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

### Deployment

#### `npm run deploy`

This command runs the predeploy script to build your app, then deploys the build folder to the gh-pages branch of your repository.

