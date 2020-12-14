import React from "react";

export default class GetMessage extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {value: '', type: 0};
    }

    handleChangeValue(event)
    {
        this.setState({value: event.target.value});
    }

    handleChangeType(event)
    {
        this.setState({type: parseInt(event.target.value)});
    }

    handleSubmit(event)
    {
        this.props.getMessage(this.state.value, this.state.type);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <label>
                        Фраза:
                        <input type="text" value={this.state.value}
                               onChange={(event) => this.handleChangeValue(event)}/>
                    </label>
                    <label>
                        Тип:
                        <input type="number" max={2} min={0} value={this.state.type}
                               onChange={(event) => this.handleChangeType(event)}/>
                    </label>
                    <input type="submit" value="Скажи"/>
                </form>
            </div>
        );
    }
}
