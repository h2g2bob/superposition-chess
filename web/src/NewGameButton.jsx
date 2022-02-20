import React from 'react';
import uuid from 'react-uuid';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useRouter } from 'react-router5';
import { newGameAction } from './actions';
import './NewGameButton.css';

function NewGameButton({ label, availableChoices }) {
  const dispatch = useDispatch();
  const router = useRouter();
  return (
    <button
      className="start_game"
      type="button"
      onClick={() => {
        const newGameId = uuid();
        router.navigate('game', { id: newGameId });
        dispatch(newGameAction(newGameId, availableChoices));
      }}
    >
      { label }
    </button>
  );
}

NewGameButton.propTypes = {
  label: PropTypes.string.isRequired,
  availableChoices: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default NewGameButton;
