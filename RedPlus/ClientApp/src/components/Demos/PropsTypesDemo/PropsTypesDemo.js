import React from 'react';
import PropTypes from 'prop-types'; 

// 자식 컴포넌트
const PropsTypesDemoSub = (props) => {
    return <div>{ props.title }: {props.children}</div>
};

PropsTypesDemoSub.defaultProps = {
    title: '기본 제목',
};

PropsTypesDemoSub.propTypes = {
    title: PropTypes.string
};

// 부모 컴포넌트
export class PropsTypesDemo extends React.Component {
    render() {
        return <div><PropsTypesDemoSub>자식 부분</PropsTypesDemoSub></div>
    }
}
