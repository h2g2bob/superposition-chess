import { configureStore } from '@reduxjs/toolkit';
import { connectRouter, routerMiddleware } from 'connected-react-router';
import { actions } from './actions';
import history from './history';

const initialState = {
};

function newGame(action) {
  return {
    id: action.id,
    boardSize: action.boardSize,
  };
}

const store = configureStore({
  preloadedState: initialState,
  middleware: [routerMiddleware(history)],
  reducer: {
    router: connectRouter(history),
    game: (state = initialState, action = undefined) => {
      switch (action.type) {
        case actions.NEW_GAME:
          return { ...state, game: newGame(action) };
        default:
          return state;
      }
    },
  },
});

export default store;
