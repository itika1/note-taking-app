import { createStore } from 'redux';
import { combineReducers } from 'redux';
import noteReducer from './reducers/noteReducer';
import { loadState, saveState } from './localStorage';

const rootReducer = combineReducers({
  notes: noteReducer,
});

const persistedState = loadState();

const store = createStore(rootReducer, persistedState);

store.subscribe(() => {
  saveState({
    notes: store.getState().notes,
  });
});

export default store;
