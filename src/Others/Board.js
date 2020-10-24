import React from 'react';
import logo from '../logo.svg';
import '../App.css';
import Crown from "../Classes/Objects/Crown";
import Character from "../Classes/Objects/Character";
import Hole from "../Classes/Objects/Hole";
import Wall from "../Classes/Objects/Wall";

export default class Board extends React.Component{
    render() {
        return(
            <svg width={1000} height={400}>
                <rect width={1000} height={400} fill="#ffffff" stroke="#000000"/>
                <Character cx={this.props.characterCx} cy={this.props.characterCy}
                           paused={this.props.paused} isLeft={false} hasCrown={false}
                           anim={this.props.anim}/>
            </svg>
        )
    }
}
