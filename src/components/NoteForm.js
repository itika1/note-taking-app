import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { addNote } from '../actions/noteActions';

const NoteForm = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [tempBackgroundColor, setTempBackgroundColor] = useState('#ffffff');
  const [image, setImage] = useState(null);
  const dispatch = useDispatch();

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleApplyColor = () => {
    setBackgroundColor(tempBackgroundColor);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (content.trim()) {
      dispatch(addNote({
        title,
        content,
        backgroundColor,
        image
      }));
      setTitle('');
      setContent('');
      setBackgroundColor('#ffffff');
      setTempBackgroundColor('#ffffff');
      setImage(null);
    }
  };

  const triggerFileInput = () => {
    document.getElementById('fileInput').click();
  };

  return (
    <form onSubmit={handleSubmit} style={{ ...styles.form, backgroundColor }}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={styles.input}
      />
      <textarea
        placeholder="Take a note..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={styles.textarea}
      ></textarea>
      <div style={styles.iconContainer}>
        <input
          type="color"
          value={tempBackgroundColor}
          onChange={(e) => setTempBackgroundColor(e.target.value)}
          style={{
            ...styles.colorPicker,
            backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 512 512'%3E%3C!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--%3E%3Cpath d='M512 256c0 .9 0 1.8 0 2.7c-.4 36.5-33.6 61.3-70.1 61.3H344c-26.5 0-48 21.5-48 48c0 3.4 .4 6.7 1 9.9c2.1 10.2 6.5 20 10.8 29.9c6.1 13.8 12.1 27.5 12.1 42c0 31.8-21.6 60.7-53.4 62c-3.5 .1-7 .2-10.6 .2C114.6 512 0 397.4 0 256S114.6 0 256 0S512 114.6 512 256zM128 288a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm0-96a32 32 0 1 0 0-64 32 32 0 1 0 0 64zM288 96a32 32 0 1 0 -64 0 32 32 0 1 0 64 0zm96 96a32 32 0 1 0 0-64 32 32 0 1 0 0 64z'/%3E%3C/svg%3E")`,            
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'right center',
            paddingRight: '30px', // Adjust based on icon size
          }}
        />



        <span onClick={handleApplyColor} style={styles.icon} title="Apply Color">
          ✔️
        </span>
        <input
          type="file"
          accept="image/*"
          id="fileInput"
          onChange={handleImageChange}
          style={styles.fileInput}
        />
        <span onClick={triggerFileInput} style={styles.icon} title="Add Image">
          🖼️
        </span>
        <button type="submit" style={styles.icon} title="Add Note">
          ➕
        </button>
      </div>
    </form>
  );
};

const styles = {
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginBottom: '20px',
    padding: '20px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  input: {
    width: '300px',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  textarea: {
    width: '300px',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  colorPicker: {
    margin: '5px 0',
    border: 'none',
    padding: '0',
    cursor: 'pointer',
  },
  icon: {
    padding: '10px',
    margin: '0 5px',
    cursor: 'pointer',
    fontSize: '18px',
    borderRadius: '4px',
    transition: 'background 0.3s',
  },
  fileInput: {
    display: 'none',
  },
  button: {
    padding: '10px 20px',
    margin: '5px',
    border: 'none',
    borderRadius: '4px',
    backgroundColor: '#007bff',
    color: 'white',
    cursor: 'pointer',
  },
};

export default NoteForm;
