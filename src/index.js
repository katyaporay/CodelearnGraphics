import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Game from "./MainReactComponents/Game";

ReactDOM.render(
    <Game mode="2d"/>,
    document.getElementById('root')
);

serviceWorker.unregister();
