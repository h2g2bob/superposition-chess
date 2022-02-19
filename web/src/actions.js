export const actions = {
  NEW_GAME: 'NEW_GAME',
  SET_PLAYER_TEAM: 'SET_PLAYER_TEAM',
  SELECT_PIECE: 'SELECT_PIECE',
  MOVE_PIECE: 'MOVE_PIECE',
};

export function newGameAction(newGameId, boardSize) {
  return {
    type: actions.NEW_GAME,
    newGameId,
    boardSize,
  };
}

export function setPlayerTeamAction(playerTeam) {
  return {
    type: actions.SET_PLAYER_TEAM,
    playerTeam,
  };
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
