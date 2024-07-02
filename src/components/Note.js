import React from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote, pinNote } from '../actions/noteActions';

const Note = ({ note }) => {
  const dispatch = useDispatch();

  return (
    <div style={{ ...styles.note, ...(note.pinned ? styles.pinned : {}) }}>
      {note.title && <h2 style={styles.title}>{note.title}</h2>}
      <p style={styles.content}>{note.content}</p>
      <button onClick={() => dispatch(pinNote(note.id))} style={styles.pinButton}>
        {note.pinned ? 'Unpin' : 'Pin'}
      </button>
      <button onClick={() => dispatch(deleteNote(note.id))} style={styles.deleteButton}>
        Delete
      </button>
    </div>
  );
};

const styles = {
  note: {
    padding: '15px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    backgroundColor: '#f9f9f9',
    position: 'relative',
    minHeight: '100px', // Ensure minimum height for short notes
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  pinned: {
    border: '1px solid #007bff',
  },
  title: {
    margin: '0 0 10px 0',
  },
  content: {
    flex: '1',
    margin: '0 0 10px 0',
  },
  pinButton: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
  deleteButton: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    padding: '5px 10px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: 'red',
    color: 'white',
    cursor: 'pointer',
  },
};

export default Note;
