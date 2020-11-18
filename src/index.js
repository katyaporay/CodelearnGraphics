import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Game from "./MainReactComponents/Game";

const game = <Game/>;

ReactDOM.render(
    game,
    document.getElementById('root')
);

serviceWorker.unregister();
