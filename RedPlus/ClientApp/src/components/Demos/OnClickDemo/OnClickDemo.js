import React, { Component } from 'react';

export class OnClickDemo extends Component {
    render() {
        return <button onClick={
            () => { window.alert('클릭이벤트 발생'); }
        }>클릭테스트</button>
    }
}