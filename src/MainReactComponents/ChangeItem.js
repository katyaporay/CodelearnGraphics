import React from "react";

export default class ChangeItem extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {
            index: 0,
            value: '',
        };
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
        this.props.changeItem("first_chest", this.state.index, this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <br/>
                    <label>
                        Индекс изменяемого элемента:
                        <input type="number" value={this.state.index}
                               onChange={(index) =>
                                   this.handleChangeIndex(index)}/>
                    </label>
                    <br/>
                    <label>
                        Новое значение элемента:
                        <input type="text" value={this.state.value}
                               onChange={(event) =>
                                   this.handleChangeValue(event)}/>
                    </label>
                    <br/>
                    <input type="submit" value="Изменить"/>
                </form>
                <br/>
            </div>
        )
    }
}
