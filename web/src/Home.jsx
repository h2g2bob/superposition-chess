import React from 'react';
import uuid from 'react-uuid';
import { useNavigate } from 'react-router';

function Home() {
  const navigate = useNavigate();
  return (
    <button
      type="button"
      onClick={() => {
        const newGameId = uuid();
        navigate(`/game/${newGameId}`);
      }}
    >
      New game
    </button>
  );
}

Home.propTypes = {
};

export default Home;
