export const actions = {
  NEW_GAME: 'NEW_GAME',
  SET_PLAYER_TEAM: 'SET_PLAYER_TEAM',
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
