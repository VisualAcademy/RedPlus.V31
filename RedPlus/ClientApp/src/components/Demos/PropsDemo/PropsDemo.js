import React from 'react';

const PropsDemoSub = props => {
    return <h2>[2] 자식: 매개 변수로 받은 값: {props.message}</h2>
};

PropsDemoSub.defaultProps = {
    message: "기본값"
};

export class PropsDemo extends React.Component {
    render() {
        return (
            <div>
                <h1>[1] 부모: 자식 컴포넌트에게 데이터 전달</h1>
                <PropsDemoSub message="보내준 데이터"></PropsDemoSub>
                <PropsDemoSub></PropsDemoSub>
            </div >
        );
    };
}
