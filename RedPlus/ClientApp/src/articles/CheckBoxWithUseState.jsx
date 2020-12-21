import React, { useState } from 'react';

function CheckBoxWithUseState() {
    // useState를 사용하여 상태 데이터 관리 
    const [chkAgree, setChkAgree] = useState(false);

    return (
        <>
            <input type="checkbox"
                value={chkAgree}
                onChange={() => setChkAgree(chkAgree => !chkAgree)}
            /> 약관에 동의하시겠습니까?  
            <hr />
            <div>
                {chkAgree ? "동의함" : "동의하지않음"}
            </div>
        </>
    );
}

export default CheckBoxWithUseState;
