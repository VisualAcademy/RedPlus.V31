// {{}} 형태를 사용하여 스타일 지정하기 
import React from 'react';

export class StyleAttribute extends React.Component {
    render() {
        const divStyle = { color: 'red', backgroundColor: 'yellow', };
        return (<div style={divStyle}>인라인 스타일 <span style={{ color: 'blue', }}>직접 인라인으로 스타일 지정</span></div>);
    }
}
