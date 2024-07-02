import { ADD_NOTE, DELETE_NOTE, PIN_NOTE } from '../actions/noteActions';

const initialState = {
  notes: [],
};

const noteReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, { ...action.payload, id: Date.now(), pinned: false }],
      };
    case DELETE_NOTE:
      return {
        ...state,
        notes: state.notes.filter((note) => note.id !== action.payload),
      };
    case PIN_NOTE:
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
