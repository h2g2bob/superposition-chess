import { configureStore } from '@reduxjs/toolkit';

const initialState = {
  boardSize: 4,
};

const store = configureStore({
  preloadedState: initialState,
  reducer: {
    boardSize: (state = initialState) => state,
  },
});
export default store;
