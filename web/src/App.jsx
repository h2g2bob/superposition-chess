import React from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import { ConnectedRouter } from 'connected-react-router';
import history from './history';
import Home from './Home';
import Game from './Game';

function App() {
  return (
    <ConnectedRouter history={history}>
      <BrowserRouter history={history}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/game/:id" element={<Game />} />
        </Routes>
      </BrowserRouter>
    </ConnectedRouter>
  );
}

App.propTypes = {
};

export default App;
