import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import Home from './pages/Home';
import Credits from './pages/Credits';
import GameBoard from './pages/GameBoard';
import EndGame from './pages/EndGame';

function Navigation() {
  return (
    <header>
      <div className='inner'>
        <div className='logo'>Play 4 Privacy</div>
        <nav>
          <ul>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/credits'>Credits</Link></li>
            <li><Link to='/gameboard'>Gameboard</Link></li>
            <li><Link to='/leaderboard'>Leaders</Link></li>
            <li><Link to='/endgame'>Endgame</Link></li>
          </ul>
        </nav>
        <div className='clear' />
      </div>
    </header>
  );
}

function App() {
  return (
    <div>
      <Navigation />
      <Switch>
        <Route path='/credits' component={Credits} />
        <Route path='/gameboard' component={GameBoard} />
        <Route path='/endgame' component={EndGame} />
        <Route path='/' component={Home} />
      </Switch>
    </div>
  );
}

export default App;