import React, { Component } from 'react';

class TextBoxOnChangeEventHandler extends Component {
    constructor() {
        super();
        this.state = {
            userName: "",
            password: "",
        };
        this.handleUserNameChange = this.handleUserNameChange.bind(this);
        this.handlePasswordChange = this.handlePasswordChange.bind(this);
    }

    handleUserNameChange(e) {
        this.setState({ userName: e.target.value, });
    }

    handlePasswordChange(e) {
        this.setState({ password: e.target.value, });
    }

    render() {
        return (<>
            <input type="text" placeholder="아이디" onChange={this.handleUserNameChange} />
            <input type="text" placeholder="암호" onChange={this.handlePasswordChange} />
            <hr />
            아이디: {this.state.userName}, 암호: {this.state.password}
        </>);
    }
}

export default TextBoxOnChangeEventHandler;
