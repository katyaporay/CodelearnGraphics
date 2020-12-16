import React from "react";

export default class SwapItems extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            num_chest: 0,
            index1: 0,
            index2: 0,
        };
    }

    handleChangeNumChest(event)
    {
        this.setState({num_chest: event.target.value});
    }

    handleChangeIndex1(event)
    {
        this.setState({index1: event.target.value});
    }

    handleChangeIndex2(index)
    {
        this.setState({index2: index.target.value});
    }

    handleSubmit(event)
    {
        this.props.swapItems(this.state.num_chest, this.state.index1, this.state.index2);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <br/>
                    <label>
                        Номер сундука:
                        <input type="number" value={this.state.num_chest}
                               onChange={(event) =>
                                   this.handleChangeNumChest(event)}/>
                    </label>
                    <br/>
                    <label>
                        Индекс первого элемента:
                        <input type="number" value={this.state.index1}
                               onChange={(event) =>
                                   this.handleChangeIndex1(event)}/>
                    </label>
                    <br/>
                    <label>
                        Индекс второго элемента:
                        <input type="number" value={this.state.index2}
                               onChange={(event) =>
                                   this.handleChangeIndex2(event)}/>
                    </label>
                    <br/>
                    <input type="submit" value="Поменять"/>
                </form>
                <br/>
            </div>
        )
    }
}
