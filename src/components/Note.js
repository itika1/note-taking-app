import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteNote, editNote, pinNote } from '../actions/noteActions';

const Note = ({ note }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);
  const [tempBackgroundColor, setTempBackgroundColor] = useState(note.backgroundColor);
  const [image, setImage] = useState(note.image);

  const dispatch = useDispatch();

  const handleDelete = () => {
    dispatch(deleteNote(note.id));
  };

  const handlePin = () => {
    dispatch(pinNote(note.id));
  };

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  const handleApplyColor = () => {
    note.backgroundColor = tempBackgroundColor;
    dispatch(editNote({ ...note, backgroundColor: tempBackgroundColor }));
  };

  const handleSave = () => {
    dispatch(editNote({
      ...note,
      title: editedTitle,
      content: editedContent,
      backgroundColor: tempBackgroundColor,
      image,
    }));
    setIsEditing(false);
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
        note.image = reader.result;
        dispatch(editNote({ ...note, image: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div style={{ ...styles.note, backgroundColor: note.backgroundColor }}>
      {isEditing ? (
        <div>
          <input
            type="text"
            value={editedTitle}
            onChange={(e) => setEditedTitle(e.target.value)}
            style={styles.input}
          />
          <textarea
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
            style={styles.textarea}
          ></textarea>
          <div style={styles.iconContainer}>
            <input
              type="color"
              value={tempBackgroundColor}
              onChange={(e) => setTempBackgroundColor(e.target.value)}
              style={styles.hiddenColorPicker}
              id={`colorPicker-${note.id}`}
            />
            <label htmlFor={`colorPicker-${note.id}`} style={styles.icon} title="Choose Background Color">
              🎨
            </label>
            <span onClick={handleApplyColor} style={styles.icon} title="Apply Color">
              ✔️
            </span>
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              style={styles.fileInput}
              id={`fileInput-${note.id}`}
            />
            <label htmlFor={`fileInput-${note.id}`} style={styles.icon} title="Add Image">
              🖼️
            </label>
            <span onClick={handleSave} style={styles.icon} title="Save">
              💾
            </span>
            <span onClick={handleEdit} style={styles.icon} title="Cancel">
              ❌
            </span>
          </div>
        </div>
      ) : (
        <div>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          {note.image && <img src={note.image} alt="note" style={styles.image} />}
          <div style={styles.iconContainer}>
            <span onClick={handleEdit} style={styles.icon} title="Edit">
              ✏️
            </span>
            <span onClick={handlePin} style={styles.icon} title={note.pinned ? 'Unpin' : 'Pin'}>
              📌
            </span>
            <span onClick={handleDelete} style={styles.icon} title="Delete">
              🗑️
            </span>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  note: {
    width: '100%',
    maxWidth: '300px',
    padding: '20px',
    margin: '10px',
    borderRadius: '8px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    boxSizing: 'border-box',
  },
  input: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  textarea: {
    width: '100%',
    padding: '10px',
    margin: '5px 0',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '16px',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '10px',
  },
  hiddenColorPicker: {
    display: 'none',
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
  image: {
    width: '100%',
    height: 'auto',
    marginTop: '10px',
    borderRadius: '4px',
  },
};

export default Note;
