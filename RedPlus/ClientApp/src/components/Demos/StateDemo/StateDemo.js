// StateDemo.js
import React, { Component } from 'react';

export class StateDemo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: "[1] 처음 상태값 로드"
        };
    }

    render() {
        return (
            <div>
                <h1>상태값: {this.state.name}</h1>
                <button onClick={
                    () => {
                        this.setState({ name: '[2] 새로운 상태값으로 변경' });
                    }
                }>변경
                </button>
            </div>
        );
    }
}
