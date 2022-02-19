import { createStore, applyMiddleware, combineReducers } from 'redux';
import { router5Middleware, router5Reducer } from 'redux-router5';
import { actions } from './actions';
import { pieceAt, canMove } from './moves';
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
    playerTeam: C.LIGHT,
    selectedPieceKey: null,
  };
}

function otherTeam(team) {
  return team === C.LIGHT ? C.DARK : C.LIGHT;
}

function updatePiece(pieces, key, update) {
  return pieces.map((oldPiece) => {
    if (oldPiece.key === key) {
      const newPiece = { ...oldPiece, ...update };
      return newPiece;
    }
    return oldPiece;
  });
}

function movePiece(state, action) {
  const { pieceKey, row, col } = action;
  const { pieces, boardSize, playerTeam } = state;
  const [selectedPiece] = pieces.filter((piece) => piece.key === pieceKey);

  /* move/take allowed */
  const remainingPieceChoices = canMove(selectedPiece, pieces, row, col, boardSize);
  if (!remainingPieceChoices.length) {
    return state;
  }

  const willTakePiece = pieceAt(pieces, row, col);
  if (willTakePiece) {
    /* take */
    return state;
  }

  /* move */
  return {
    ...state,
    selectedPieceKey: null,
    pieces: updatePiece(pieces, pieceKey, {
      row,
      col,
      choices: remainingPieceChoices,
    }),
    playerTeam: otherTeam(playerTeam),
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
          case actions.SELECT_PIECE:
            return { ...state, selectedPieceKey: action.pieceKey };
          case actions.MOVE_PIECE:
            /* eslint-disable no-console */
            return movePiece(state, action);
          default:
            return state;
        }
      },
    }),
    initialState,
  );

  return store;
}
