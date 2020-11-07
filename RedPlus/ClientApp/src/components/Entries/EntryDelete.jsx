// @page "/Entries/Delete"
import React, { Component } from 'react';

export class EntryDelete extends Component {
    constructor(props) {
        super(props);

        // 컴포넌트 상태 데이터 
        this.state = {
            id: 0,
            name: '',
            title: "",
            content: "",
            created: null
        };

        // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
        // https://ko.reactjs.org/docs/handling-events.html
        this.navigateToIndex = this.navigateToIndex.bind(this); 
    }

    // 페이지 로드, OnInitialized()
    componentDidMount() {

    }

    render() {
        return (
            <h1>Delete</h1>
        );
    }

    // 리스트 페이지로 이동
    navigateToIndex() {
        const { history } = this.props;
        history.push('/Entries');
    }
}
