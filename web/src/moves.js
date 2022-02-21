import C from './constants';

export function pieceAt(pieces, i, j) {
  const maybePieceList = pieces.filter((piece) => piece.row === i && piece.col === j);
  if (i === null) {
    return null;
  }
  if (maybePieceList.length === 1) {
    return maybePieceList[0];
  }
  if (maybePieceList.length === 0) {
    return null;
  }
  throw new Error('multiple pieces at the same place');
}

const CAN_MOVE = {};

export function canMove(piece, pieces, row, col, boardSize) {
  if (piece.row === row && piece.col === col) {
    /* stay where you are - not a move */
    return [];
  }
  if (piece.row < 0 || piece.row >= boardSize
   || piece.col < 0 || piece.col >= boardSize) {
    /* can't go off-board */
    return [];
  }
  const willTake = pieceAt(pieces, row, col);
  if (willTake && willTake.team === piece.team) {
    /* can't take your own piece */
    return [];
  }
  /* for which pieces is this move valid? */
  return piece.choices.filter(
    (choice) => {
      const moveFunc = CAN_MOVE[choice];
      return moveFunc({
        piece, pieces, row, col, boardSize,
      });
    },
  );
}

CAN_MOVE[C.PAWN] = ({
  piece, pieces, row, col, boardSize,
}) => {
  const forward = piece.team === C.LIGHT ? -1 : +1;
  const startingRow = piece.team === C.LIGHT ? (boardSize - 1) : 0;
  if (piece.col === col) {
    /* move forward one square if it's unoccupied */
    if (pieceAt(pieces, piece.row + forward, piece.col)) {
      return false;
    }
    if (piece.row + forward === row) {
      return true;
    }
    /* move forward two squares if both are unoccupied */
    if (piece.row === startingRow) {
      if (pieceAt(pieces, piece.row + (2 * forward), piece.col)) {
        return false;
      }
      if (piece.row + (2 * forward) === row) {
        return true;
      }
    }
  }
  if (Math.abs(piece.col - col) === 1 && piece.row + forward === row) {
    /* can take a piece diagonally */
    if (pieceAt(pieces, row, col)) {
      return true;
    }
  }
  return false;
};

CAN_MOVE[C.KING] = ({ piece, row, col }) => (
  Math.abs(piece.row - row) <= 1 && Math.abs(piece.col - col) <= 1
);

CAN_MOVE[C.ROOK] = ({
  piece, pieces, row, col,
}) => {
  const unitCol = Math.sign(col - piece.col);
  const unitRow = Math.sign(row - piece.row);
  if (unitCol !== 0 && unitRow !== 0) {
    return false;
  }
  let checkRow = piece.row + unitRow;
  let checkCol = piece.col + unitCol;
  while (checkRow !== row && checkCol !== col) {
    if (pieceAt(pieces, checkRow, checkCol)) {
      return false;
    }
    checkRow += unitRow;
    checkCol += unitCol;
  }
  return true;
};

CAN_MOVE[C.BISHOP] = ({
  piece, pieces, row, col,
}) => {
  const moveCol = (col - piece.col);
  const moveRow = (row - piece.row);
  if (Math.abs(moveCol) !== Math.abs(moveRow)) {
    return false;
  }

  const unitCol = Math.sign(moveCol);
  const unitRow = Math.sign(moveRow);
  let checkRow = piece.row + unitRow;
  let checkCol = piece.col + unitCol;
  while (checkRow !== row && checkCol !== col) {
    if (pieceAt(pieces, checkRow, checkCol)) {
      return false;
    }
    checkRow += unitRow;
    checkCol += unitCol;
  }
  return true;
};

CAN_MOVE[C.KNIGHT] = ({
  piece, row, col,
}) => {
  const moveCol = (col - piece.col);
  const moveRow = (row - piece.row);
  if (Math.abs(moveCol) === 2 && Math.abs(moveRow) === 1) {
    return true;
  }
  if (Math.abs(moveCol) === 1 && Math.abs(moveRow) === 2) {
    return true;
  }
  return false;
};

CAN_MOVE[C.QUEEN] = (args) => CAN_MOVE[C.ROOK](args) || CAN_MOVE[C.BISHOP](args);
CAN_MOVE[C.AMAZON] = (args) => CAN_MOVE[C.QUEEN](args) || CAN_MOVE[C.KNIGHT](args);
