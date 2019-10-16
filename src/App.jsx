import React from 'react';
import GameRoom from './containers/GameRoom';
import DefaultContainer from './containers/DefaultContainer';
import { Route, Link } from 'react-router-dom'
import Splash from './Splash.jsx'
import { Route, Link } from 'react-router-dom'
import Splash from './Splash.jsx'

const App = () => (
  <fragment>

    <DefaultContainer />
    <GameRoom />

  </fragment>
);

export default App;
