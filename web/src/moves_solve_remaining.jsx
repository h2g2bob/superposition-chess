function withoutFirstOccurrance(item, list) {
  const index = list.indexOf(item);
  if (index < 0) {
    throw Error('withoutFirstOccurrance() does not have any occurrance');
  }
  return [...list.slice(0, index), ...list.slice(index + 1)];
}

/*
  existsSolutionForPieces([['r', 'p'], ['p']], availablePieces=['r', 'p']) -> true
  existsSolutionForPieces([['p'], ['p']], availablePieces=['r', 'p']) -> false
  existsSolutionForPieces([['p'], ['p']], availablePieces=['p', 'p']) -> true
*/
export function existsSolutionForPieces(pieces, availablePieces) {
  if (pieces.length === 0) {
    return true;
  }
  const thisPiece = pieces[0];
  const otherPieces = pieces.slice(1);
  return thisPiece.some((kind) => {
    if (availablePieces.indexOf(kind) < 0) {
      return false;
    }

    const remainingAvailablePieces = withoutFirstOccurrance(kind, availablePieces);
    return existsSolutionForPieces(otherPieces, remainingAvailablePieces);
  });
}

export function limitPieceToRemainingPossibilities(piece, pieces, availableChoices) {
  const otherPieces = pieces.filter((otherPiece) => otherPiece.key !== piece.key);
  const otherPieceChoices = otherPieces.map((otherPiece) => otherPiece.choices);
  const { choices } = piece;
  const newChoices = choices.filter((kind) => existsSolutionForPieces(
    [[kind], ...otherPieceChoices],
    availableChoices,
  ));
  return {
    ...piece,
    choices: newChoices,
  };
}
