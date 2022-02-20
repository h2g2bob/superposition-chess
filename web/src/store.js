import { createStore, applyMiddleware, combineReducers } from 'redux';
import { router5Middleware, router5Reducer } from 'redux-router5';
import { actions } from './actions';
import { pieceAt, canMove } from './moves';
import { limitPieceToRemainingPossibilities } from './moves_solve_remaining';
import C from './constants';

function unique(array) {
  return array.filter((item, index) => array.slice(0, index).indexOf(item) === -1);
}

function makePieces(boardSize, availableChoices) {
  const pieces = [];

  for (let idx = 0; idx < boardSize; idx += 1) {
    pieces.push({
      row: 0,
      col: idx,
      choices: unique(availableChoices),
      team: C.DARK,
      key: `d${idx}`,
    });
    pieces.push({
      row: boardSize - 1,
      col: idx,
      choices: unique(availableChoices),
      team: C.LIGHT,
      key: `l${idx}`,
    });
  }

  return pieces;
}

function newGame(action) {
  const { availableChoices } = action;
  const boardSize = availableChoices.length;
  return {
    id: action.newGameId,
    boardSize,
    availableChoices,
    pieces: makePieces(boardSize, availableChoices),
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
  const { pieces, boardSize, team } = state;
  const [selectedPiece] = pieces.filter((piece) => piece.key === pieceKey);

  if (!selectedPiece) {
    throw Error('action.pieceKey is not the id of any piece');
  }

  /* move/take allowed */
  const remainingPieceChoices = canMove(selectedPiece, pieces, row, col, boardSize);
  if (!remainingPieceChoices.length) {
    return null;
  }

  /* move */
  let newPieces = updatePiece(pieces, pieceKey, {
    row,
    col,
    choices: remainingPieceChoices,
  });

  const willTakePiece = pieceAt(pieces, row, col);
  if (willTakePiece) {
    /* take */
    if (willTakePiece.team === team) {
      return null;
    }
    newPieces = updatePiece(newPieces, willTakePiece.key, {
      row: -1,
      col: -1,
    });
  }

  return newPieces;
}

function filterPiecesByValidCombinations(pieces, availableChoices) {
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

function filterPiecesByKingAlive(pieces, availableChoices) {
  const piecesKingAlive = pieces.map((piece) => {
    if (piece.row === -1) {
      return {
        ...piece,
        choices: piece.choices.filter((choice) => choice !== C.KING),
      };
    }
    return piece;
  });
  return filterPiecesByValidCombinations(piecesKingAlive, availableChoices);
}

function movePiece(state, action) {
  const { availableChoices } = state;
  const piecesMove = basicMovePiece(state, action);
  if (piecesMove === null) {
    return null;
  }

  const piecesCombo = filterPiecesByValidCombinations(piecesMove, availableChoices);
  if (piecesCombo === null) {
    return null;
  }

  const piecesKing = filterPiecesByKingAlive(piecesCombo, availableChoices);
  return piecesKing === null ? piecesCombo : piecesKing;
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
