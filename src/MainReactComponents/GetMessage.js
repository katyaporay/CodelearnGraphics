import React from "react";

export default class GetMessage extends React.Component
{
    constructor(props) {
        super(props);
        this.state = {value: ''};
    }

    handleChange(event)
    {
        this.setState({value: event.target.value});
    }

    handleSubmit(event)
    {
        this.props.getMessage(this.state.value);
        event.preventDefault();
    }

    render() {
        return (
            <div>
                <form onSubmit={(event) => this.handleSubmit(event)}>
                    <label>
                        Фраза:
                        <input type="text" value={this.state.value}
                               onChange={(event) => this.handleChange(event)}/>
                    </label>
                    <input type="submit" value="Скажи"/>
                </form>
            </div>
        );
    }
}
