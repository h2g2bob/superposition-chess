import { createStore, applyMiddleware, combineReducers } from 'redux';
import { router5Middleware, router5Reducer } from 'redux-router5';
import { actions } from './actions';

function newGame(action) {
  return {
    id: action.id,
    boardSize: action.boardSize,
  };
}

export default function configureStore(router, initialState = {}) {
  const createStoreWithMiddleware = applyMiddleware(
    router5Middleware(router),
  )(createStore);

  const store = createStoreWithMiddleware(
    combineReducers({
      router: router5Reducer,
      game: (state = initialState, action = undefined) => {
        switch (action.type) {
          case actions.NEW_GAME:
            return { ...state, game: newGame(action) };
          default:
            return state;
        }
      },
    }),
    initialState,
  );

  return store;
}
