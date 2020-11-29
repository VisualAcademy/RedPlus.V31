import React, { Component } from 'react';

// 자식 컴포넌트
const PropsChildrenDemoSub = (props) => {
    return <div>Render Fragment: {props.children}</div>
};

// 부모 컴포넌트
export class PropsChildrenDemo extends React.Component {
    render() {
        return <div><PropsChildrenDemoSub>렌더 프래그먼트</PropsChildrenDemoSub></div>
    }
}