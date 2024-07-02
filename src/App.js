import React from 'react';
import NoteForm from './components/NoteForm';
import NotesList from './components/NotesList';

function App() {
  return (
    <div style={styles.app}>
      <h1 style={styles.header}>Note Taking App</h1>
      <NoteForm />
      <NotesList />
    </div>
  );
}

const styles = {
  app: {
    textAlign: 'center',
    fontFamily: 'Arial, sans-serif',
    padding: '20px',
  },
  header: {
    marginBottom: '20px',
  },
};

export default App;
