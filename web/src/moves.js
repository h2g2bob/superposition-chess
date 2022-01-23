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

function possibleMovesPawn(piece, pieces, size) {
  const moves = [];
  const oneRowForward = piece.row + ((piece.team === 'l') ? -1 : +1);
  if (pieceAt(pieces, oneRowForward, piece.col) === null) {
    moves.push([oneRowForward, piece.col]);

    if (piece.row === 0 || piece.row === (size - 1)) {
      const twoRowsForward = piece.row + ((piece.team === 'l') ? -2 : +2);
      if (pieceAt(pieces, twoRowsForward, piece.col) === null) {
        moves.push([twoRowsForward, piece.col]);
      }
    }
  }
  return moves;
}

function possibleMovesKing(piece) {
  const moves = [];
  moves.push([piece.row - 1, piece.col - 1]);
  moves.push([piece.row - 1, piece.col]);
  moves.push([piece.row - 1, piece.col + 1]);
  moves.push([piece.row, piece.col - 1]);
  moves.push([piece.row, piece.col + 1]);
  moves.push([piece.row + 1, piece.col - 1]);
  moves.push([piece.row + 1, piece.col]);
  moves.push([piece.row + 1, piece.col + 1]);
  return moves;
}

export function possibleMoves(piece, pieces, size) {
  return [
    ...possibleMovesPawn(piece, pieces, size),
    ...possibleMovesKing(piece),
  ];
}
