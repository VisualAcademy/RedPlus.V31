import React from 'react';

const btnStyles = {
    color: 'white',
    backgroundColor: 'green',
    border: '1px solid red',
};

function InlineStyle() {
    return (
        <div>
            <button style={btnStyles}>버튼에 스타일 적용하기</button>
        </div>
    );
}

export default InlineStyle;

