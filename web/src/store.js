import { createStore, applyMiddleware, combineReducers } from 'redux';
import { router5Middleware, router5Reducer } from 'redux-router5';
import { actions } from './actions';
import { pieceAt, canMove } from './moves';
import { limitPieceToRemainingPossibilities } from './moves_solve_remaining';
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
    availableChoices: [C.ROOK, C.KING, C.PAWN, C.PAWN],
    pieces: makePieces(action.boardSize),
    proposedPieces: null,
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

function basicMovePiece(state, action) {
  const { pieceKey, row, col } = action;
  const { pieces, boardSize } = state;
  const [selectedPiece] = pieces.filter((piece) => piece.key === pieceKey);

  if (!selectedPiece) {
    throw Error('action.pieceKey is not the id of any piece');
  }

  /* move/take allowed */
  const remainingPieceChoices = canMove(selectedPiece, pieces, row, col, boardSize);
  if (!remainingPieceChoices.length) {
    return null;
  }

  const willTakePiece = pieceAt(pieces, row, col);
  if (willTakePiece) {
    /* take - not implemented yet */
    return null;
  }

  /* move */
  return updatePiece(pieces, pieceKey, {
    row,
    col,
    choices: remainingPieceChoices,
  });
}

function movePiece(state, action) {
  const { availableChoices } = state;
  const pieces = basicMovePiece(state, action);
  if (pieces === null) {
    return null;
  }

  // eg: if one piece moves like a queen, then no other piece can be the queen
  const piecesLimitedByValidCombinations = pieces.map(
    (piece) => limitPieceToRemainingPossibilities(
      piece,
      pieces.filter((teamPiece) => teamPiece.team === piece.team),
      availableChoices,
    ),
  );
  if (piecesLimitedByValidCombinations.some((piece) => piece.choices.length === 0)) {
    /* eslint-disable no-console */
    console.log('No valid combination');
    return null;
  }
  return piecesLimitedByValidCombinations;
}

function commitMove(state) {
  const { playerTeam, proposedPieces } = state;
  return {
    ...state,
    pieces: proposedPieces,
    proposedPieces: null,
    selectedPieceKey: null,
    playerTeam: otherTeam(playerTeam),
  };
}

function rollbackMove(state) {
  return {
    ...state,
    proposedPieces: null,
    selectedPieceKey: null,
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
            return { ...state, proposedPieces: movePiece(state, action) };
          case actions.COMMIT_MOVE:
            return commitMove(state);
          case actions.ROLLBACK_MOVE:
            return rollbackMove(state);
          default:
            return state;
        }
      },
    }),
    initialState,
  );

  return store;
}
