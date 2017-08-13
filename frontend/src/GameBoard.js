import React from 'react';
import Board from './Board';

function GameBoard() {
  return (
    <div>
      <div className='layer showLayer' id='startGame'>
        <div className='layerInner'>
          <h2>Start a Game</h2>
          <p>Welcome to... You can join the game whenever you want. </p>
          <p>
            If you want to have an instruction of the game or the mechanism click
            on the button below:<br />
            <span className='button' id='helpButton'>Need help?</span>
          </p>
          <h3>Optional:</h3>
          <p>You can add a 3 digit name for our leaderboard</p>
          <form>
            <input name='username' type='text' className='text' placeholder='Enter 3 Digits' />
            <input type='submit' value='Save' className='submit' />
          </form>
          <p>
            Ready? Good!<br />
            <span className='button' id='joinGameButton'>JOIN GAME NOW</span>
          </p>
        </div>
      </div>

      <div className='field' id='gameField'>
        <div className='fieldInner'>

          <Board />

          <div className='gameInfo'>
            <h2>Current Game:</h2>
            <div className='item'>
              <span className='label'>Game-Clock</span>
              <span className='value' id='gameclock'>11min 23sec</span>
            </div>
            <div className='item'>
              <span className='label'>Active Team</span>
              <span className='value' id='activeTeam'>black</span>
            </div>
            <div className='item'>
              <span className='label'>Time to vote</span>
              <span className='value' id='timeToVote'>23 sec</span>
            </div>
            <div className='item'>
              <span className='label'>Placed on</span>
              <span className='value' id='placedOn'>B3</span>
            </div>
            <div className='item'>
              <span className='label'>You are on team:</span>
              <span className='value' id='yourTeam'>Black</span>
            </div>
            <div className='item'>
              <span className='label'>Players on your team</span>
              <span className='value' id='yourTeamSize'>44</span>
            </div>
            <div className='item'>
              <span className='label'>Players total</span>
              <span className='value' id='totalPlayers'>81</span>
            </div>

            <h2>Tokens:</h2>
            <div className='item'>
              <span className='label'>Tokens you have</span>
              <span className='value' id='yourTokens'>123</span>
            </div>
            <div className='item'>
              <span className='label'>Money donated so far</span>
              <span className='value' id='moneyDonated'>8888 €</span>
            </div>

            <p><span className='button' id='buyTokensButton'>Buy Tokens</span></p>

          </div>

          <div className='liveCam clear'>
            <img src='http://bixcam.kunsthausgraz.at/out/stream/webcam2_x.jpg' alt='bix Livecam' />
          </div>
        </div>
      </div>

      <div className='layer' id='helpLayer'>
        <div className='layerInner'>

          <h2>Help: How to play, How Go Works (page #6)</h2>
          <p>Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor
            invidunt ut labore et dolore magna aliquyam erat, sed diam voluptua. At vero eos et
            accusam et justo duo dolores et ea rebum. Stet clita kasd gubergren, no sea takimata
            sanctus est Lorem ipsum dolor sit amet.</p>
        </div>
      </div>

      <div className='layer' id='buyTokens'>
        <div className='layerInner'>

          <h2>Send ETH to this Wallet:</h2>
          <p>Infotext, Infotext</p>
          <div className='walletQR'>HIER KOMMT DER WALLET-QR-CODE REIN</div>

        </div>
      </div>

    </div>
  );
}

export default GameBoard;