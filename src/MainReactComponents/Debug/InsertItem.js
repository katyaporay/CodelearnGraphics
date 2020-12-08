import React from "react";

export default class InsertItem extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            num_chest: 0,
            index: 0,
            value: '',
        };
    }

    handleChangeNumChest(event)
    {
        this.setState({num_chest: event.target.value});
    }

    handleChangeValue(event)
    {
        this.setState({value: event.target.value});
    }

    handleChangeIndex(index)
    {
        this.setState({index: index.target.value});
    }

    handleSubmit(event)
    {
        this.props.insertItem(this.state.num_chest, this.state.index, this.state.value);
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
                        Куда вствить элемент:
                        <input type="number" value={this.state.index}
                               onChange={(event) =>
                                   this.handleChangeIndex(event)}/>
                    </label>
                    <br/>
                    <label>
                        Значение добавляемого элемента:
                        <input type="text" value={this.state.value}
                               onChange={(event) =>
                                   this.handleChangeValue(event)}/>
                    </label>
                    <br/>
                    <input type="submit" value="Вставить элемент"/>
                </form>
                <br/>
            </div>
        )
    }
}
