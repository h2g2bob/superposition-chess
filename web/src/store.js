import { createStore, applyMiddleware, combineReducers } from 'redux';
import { router5Middleware, router5Reducer } from 'redux-router5';
import { actions } from './actions';
import C from './constants';

function makePieces(boardSize) {
  const pieces = [];

  for (let idx = 0; idx < boardSize; idx += 1) {
    pieces.push({
      row: 0,
      col: idx,
      choices: [C.ROOK, C.KING, C.PAWN],
      team: C.DARK,
      key: `d${idx}`,
    });
    pieces.push({
      row: boardSize - 1,
      col: idx,
      choices: [C.ROOK, C.KING, C.PAWN],
      team: C.LIGHT,
      key: `l${idx}`,
    });
  }

  return pieces;
}

function newGame(action) {
  return {
    id: action.newGameId,
    boardSize: action.boardSize,
    pieces: makePieces(action.boardSize),
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
            return { ...state, ...newGame(action) };
          default:
            return state;
        }
      },
    }),
    initialState,
  );

  return store;
}
