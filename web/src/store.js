import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  game: {
    boardSize: 4,
  },
};

const store = configureStore({
  preloadedState: initialState,
  reducer: {
    game: (state = initialState) => state,
  },
});
export default store;
