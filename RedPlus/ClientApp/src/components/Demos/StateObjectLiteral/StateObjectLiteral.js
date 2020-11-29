// StateObjectLiteral.js
import React, { Component } from 'react';

export class StateObjectLiteral extends Component {
    state = {
        message: "[1] 처음 상태값 로드",
        title: "상태값",
    };
    render() {
        const { title, message } = this.state; 
        return (
            <div>
                <h1>{title}: {message}</h1>
                <button onClick={
                    () => {
                        this.setState({ message: '[2] 새로운 상태값으로 변경' });
                    }
                }>변경
                </button>
            </div>
        );
    }
}
