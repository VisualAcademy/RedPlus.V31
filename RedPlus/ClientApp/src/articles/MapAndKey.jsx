import React, { useState } from 'react';

const MapAndKey = () => {
    //[1] 샘플 데이터 준비
    const [technologies] = useState([
        { id: 1, name: 'React' },
        { id: 2, name: 'Angular' },
        { id: 3, name: 'Blazor' }
    ]);

    //[2] 데이터를 반복하여 JSX 만들기
    const lstTechnologies = technologies.map(tech => (
        <li key={tech.id}>{tech.name}</li>
    ));

    return (
        <>
            <h3>map 펑션 사용시 key 속성 주기</h3>
            <ul>
                {lstTechnologies}
            </ul>
        </>
    );
};

export default MapAndKey;
