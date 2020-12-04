// 3항 연산자를 사용하여 조건 처리
//import React, { Component } from 'react';
import React from 'react';

export class HelloComponent extends React.Component {
    render() {
        const name = 'React';
        return (<div>{name === 'React' ? (<h1>리액트</h1>) : (<h1>앵귤러</h1>)}</div>);
    }
}
