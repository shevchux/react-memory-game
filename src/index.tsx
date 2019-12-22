import React from 'react';
import ReactDOM from 'react-dom';
import { App } from './Components/App';
import { RatingProvider } from './Context/Rating/RatingProvider';
import { GameProvider } from './Context/Game/GameProvider';

ReactDOM.render((
  <RatingProvider>
    <GameProvider>
      <App />
    </GameProvider>
  </RatingProvider>
), document.getElementById('root'));
