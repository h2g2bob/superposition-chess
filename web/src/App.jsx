import React from 'react';
import { connect } from 'react-redux';
import { createRouteNodeSelector } from 'redux-router5';

import Home from './Home';
import Game from './Game';

/* eslint-disable react/prop-types */
/* eslint-disable no-console */
function App({ route }) {
  const name = 'game';
  console.log(route);

  switch (name) {
    case 'game':
      return <Game />;
    default:
      return <Home />;
  }
}

App.propTypes = {
};

export default connect(createRouteNodeSelector(''))(App);
