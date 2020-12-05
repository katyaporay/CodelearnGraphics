import React from "react";

export default class ReadLevel extends React.Component
{
    render() {
        return <input type="file" src="level.json" onChange={(event) =>
            this.props.changeLevel(event.target)}/>
    }
}
