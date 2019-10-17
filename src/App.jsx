import React from 'react';
import GameRoom from './containers/GameRoom';
import DefaultContainer from './containers/DefaultContainer';
import { Route, Link } from 'react-router-dom'
import Splash from './Splash.jsx'

const App = () => (
  <React.Fragment>
    <Route exact path="/" component={Splash} />
    <Route path="/game/:id">
      <DefaultContainer />
      <GameRoom />
    </Route>

  </React.Fragment>
);

export default App;
