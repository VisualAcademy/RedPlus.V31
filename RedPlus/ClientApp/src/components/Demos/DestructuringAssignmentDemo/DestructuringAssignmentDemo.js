// 구조 파괴 할당(Destructuring Assignment, 구조 분해 할당, 소멸 할당)
import React from 'react';

// 자식 1
const DestructuringAssignmentDemoSub1 = (props) => {
    const { message, children } = props;
    return <div>메시지: {message}, 자식: {children}</div>
};

// 자식 2
const DestructuringAssignmentDemoSub2 = ({ message, children }) => <div>메시지: {message}, 자식: {children}</div>;

export class DestructuringAssignmentDemo extends React.Component {
    render() {
        return (<div>
            <DestructuringAssignmentDemoSub1 message="메시지 1">자식 1</DestructuringAssignmentDemoSub1>
            <DestructuringAssignmentDemoSub2 message="메시지 2">자식 2</DestructuringAssignmentDemoSub2>
        </div>);
    }
}
