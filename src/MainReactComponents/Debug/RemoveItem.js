import React from "react";

export default class RemoveItem extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            num_chest: 0,
            index: 0,
        };
    }

    handleChangeNumChest(event)
    {
        this.setState({num_chest: event.target.value});
    }

    handleChangeIndex(index)
    {
        this.setState({index: index.target.value});
    }

    handleSubmit(event)
    {
        this.props.removeItem(this.state.num_chest, this.state.index);
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
                        Индекс удаляемого элемента:
                        <input type="number" value={this.state.index}
                               onChange={(event) =>
                                   this.handleChangeIndex(event)}/>
                    </label>
                    <br/>
                    <input type="submit" value="Удалить эдемент"/>
                </form>
                <br/>
            </div>
        )
    }
}
