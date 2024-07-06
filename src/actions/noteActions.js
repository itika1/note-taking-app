export const ADD_NOTE = 'ADD_NOTE';
export const DELETE_NOTE = 'DELETE_NOTE';
export const PIN_NOTE = 'PIN_NOTE';
export const EDIT_NOTE = 'EDIT_NOTE';

export const addNote = (note) => ({
  type: ADD_NOTE,
  payload: note,
});

export const deleteNote = (id) => ({
  type: DELETE_NOTE,
  payload: id,
});

export const pinNote = (id) => ({
  type: PIN_NOTE,
  payload: id,
});

export const editNote = (note) => ({
  type: EDIT_NOTE,
  payload: note,
});
