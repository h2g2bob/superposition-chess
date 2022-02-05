export const actions = {
  NEW_GAME: 'NEW_GAME',
};

export function newGameAction(newGameId, boardSize) {
  return {
    type: actions.NEW_GAME,
    newGameId,
    boardSize,
  };
}
