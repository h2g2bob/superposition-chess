export const actions = {
  NEW_GAME: 'NEW_GAME',
  SELECT_PIECE: 'SELECT_PIECE',
  MOVE_PIECE: 'MOVE_PIECE',
  COMMIT_MOVE: 'COMMIT_MOVE',
  ROLLBACK_MOVE: 'ROLLBACK_MOVE',
};

export function newGameAction(newGameId, availableChoices) {
  return {
    type: actions.NEW_GAME,
    newGameId,
    availableChoices,
  };
}

export function newGameAfterDelayAction(newGameId, availableChoices) {
  return (dispatch) => setTimeout(
    () => dispatch(newGameAction(newGameId, availableChoices)),
    1000,
  );
}

export function selectPieceAction(pieceKey) {
  return {
    type: actions.SELECT_PIECE,
    pieceKey,
  };
}

export function moveOrTakeAction(pieceKey, row, col) {
  return {
    type: actions.MOVE_PIECE,
    pieceKey,
    row,
    col,
  };
}

export function commitMoveAction() {
  return {
    type: actions.COMMIT_MOVE,
  };
}

export function rollbackMoveAction() {
  return {
    type: actions.ROLLBACK_MOVE,
  };
}
