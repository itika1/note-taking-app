import React from 'react';
import { useSelector } from 'react-redux';
import Note from './Note';

const NotesList = () => {
  const notes = useSelector((state) => state.notes.notes);
  const pinnedNotes = notes.filter((note) => note.pinned);
  const otherNotes = notes.filter((note) => !note.pinned);

  return (
    <div>
      {pinnedNotes.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Pinned</h2>
          <div style={styles.notesList}>
            {pinnedNotes.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
      {otherNotes.length > 0 && (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Others</h2>
          <div style={styles.notesList}>
            {otherNotes.map((note) => (
              <Note key={note.id} note={note} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  section: {
    marginBottom: '30px',
  },
  sectionTitle: {
    textAlign: 'left',
    marginLeft: '20px',
  },
  notesList: {
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    gap: '10px',
    padding: '0 20px',
  },
};

export default NotesList;
