import React, { Component } from 'react';

export class EntryIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: [],
            loading: true
        };

        // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
        // https://ko.reactjs.org/docs/handling-events.html
        this.navigateToCreate = this.navigateToCreate.bind(this); 
    }

    // 페이지 로드, OnInitialized()
    componentDidMount() {

    }

    render() {
        return (
            <h1>List</h1>    
        );
    }

    // 글쓰기 페이지로 이동
    navigateToCreate() {
        //const { history } = this.props;
        //history.push('/Entries/Create'); 
        this.props.history.push('/Entries/Create'); 
    }
}
