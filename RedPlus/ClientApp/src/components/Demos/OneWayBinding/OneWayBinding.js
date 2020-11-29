import React, { Component } from "react";

export class OneWayBinding extends Component {
    constructor(props) {
        super(props); 
        this.state = {
            message: "안녕하세요."
        };
        this.handleChange = this.handleChange.bind(this); 
    }

    handleChange(event) {
        this.setState({ 
            message: event.target.value 
        });
    }

    render() {
        return (
            <>
                <h1>OneWayBinding</h1>
                <div>{this.state.message}</div>
                <hr />
                <input type="text" 
                    value={this.state.message} 
                    onChange={this.handleChange}></input>
            </>
        );
    }
}
