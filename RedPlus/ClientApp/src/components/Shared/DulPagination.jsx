import React, { Component } from 'react';

export class DulPagination extends Component {
    constructor(props) {
        super(props);

        this.pagerButtonClicked = this.pagerButtonClicked.bind(this); 
    }
    pagerButtonClicked(pageNumber, e) {
        e.preventDefault(); 
        //console.log("Child", pageNumber); 
        this.props.pageIndexChanged(pageNumber - 1); // PageIndex를 부모 컴포넌트로 전송
    }

    displayData() {
        const { pageNumber, pageSize, pagerButtonCount, recordCount } = this.props;
        const pageCount = Math.ceil(recordCount / pageSize);
        const pageIndex = pageNumber - 1; 

        const pages = [];

        //@* 처음 링크 *@
        if (pageNumber === 1) {
            pages.push(
                <li className="page-item" key={"first"}>
                    <a href={"first"} className="page-link first btn disabled"><span style={{ fontSize: '7pt' }}>FIRST</span></a>
                </li>
            );
        }
        else {
            pages.push(
                <li className="page-item" key={"first"}>
                    <a href={"first"} className="page-link first btn" onClick={(e) => this.pagerButtonClicked(1, e)}>
                        <span style={{ fontSize: '7pt' }}>FIRST</span></a>
                </li >
            );
        }

        //@* 이전 n개 링크 *@
        if (pageNumber > pagerButtonCount) {
            let prevN = parseInt((pageNumber - 1) / pagerButtonCount) * pagerButtonCount; // 이전 n개 페이지 번호 계산
            pages.push(
                <li className="page-item" key={"prevN"}>
                    <a href={"prevN"} className="page-link prev btn" onClick={(e) => this.pagerButtonClicked(prevN, e)}>
                        <span style={{ fontSize: '7pt' }}>-{pagerButtonCount}</span>
                    </a>
                </li >
            );
        }
        else {
            pages.push(
                <li className="page-item" key={"prevN"}>
                    <a href={"prevN"} className="page-link prev btn disabled">
                        <span style={{ fontSize: '7pt' }}>-{pagerButtonCount}</span>
                    </a>
                </li >
            );
        }

        //@* 이전 링크: 처음 페이지가 아니면 페이지 번호를 -1씩 감소 *@
        if (pageNumber > 1) {
            let prev = pageNumber - 1; // 이전 페이지 번호 계산
            pages.push(
                <li className="page-item" key={"prev"}>
                    <a href={"prev"} className="page-link prev btn" onClick={(e) => this.pagerButtonClicked(prev, e)}>
                        <span style={{ fontSize: '7pt' }}>PREV</span>
                    </a>
                </li >
            );
        }
        else {
            pages.push(
                <li className="page-item" key={"prev"}>
                    <a href={"prev"} className="page-link prev btn disabled"><span style={{ fontSize: '7pt' }}>PREV</span></a>
                </li >
            );
        }

        //@* 페이지 수만큼 숫자 버튼 출력 *@
        let i = 0; // 숫자 버튼, 다음 n개에서 사용
        let start = parseInt(pageIndex / pagerButtonCount) * pagerButtonCount + 1; //[?]
        let end = (parseInt(pageIndex / pagerButtonCount) + 1) * pagerButtonCount; //[?]

        for (i = start; i <= end; i++) {
            let currentNumber = i; // 현재 페이지 번호 임시 저장

            // 페이지 수보다 크면 종료
            if (i > pageCount) {
                break;
            }

            // 현재 보고있는 페이지면 링크 제거
            if (i === pageNumber) {
                pages.push(
                    <li className="page-item active" key={currentNumber}>
                        <a href={currentNumber} className="page-link current btn disabled"><span style={{ fontSize: '7pt' }}>{i}</span></a>
                    </li>
                );
            }
            else {
                pages.push(
                    <li className="page-item" key={currentNumber}>
                        <a href={currentNumber} className="page-link current btn" onClick={(e) => this.pagerButtonClicked(currentNumber, e)}>
                            <span style={{ fontSize: '7pt' }}>{i}</span></a>
                    </li >
                );
            }
        }

        //@*다음 링크: 마지막 페이지가 아니면 페이지 번호를 +1씩 증가*@
        if (pageNumber < pageCount) {
            let next = pageNumber + 1; // 다음 페이지 번호 계산
            pages.push(
                <li className="page-item" key={"next"}>
                    <a href={"next"} className="page-link next btn" onClick={(e) => this.pagerButtonClicked(next, e)}>
                        <span style={{ fontSize: '7pt' }}>NEXT</span>
                    </a>
                </li >
            );
        }
        else {
            pages.push(
                <li className="page-item" key={"next"}>
                    <a href={"next"} className="page-link next btn disabled"><span style={{ fontSize: '7pt' }}>NEXT</span></a>
                </li >
            );
        }

        //@* 다음 n개 링크 *@
        if (i <= pageCount) {
            // 다음 n개 페이지 번호 계산
            let nextN = parseInt(pageIndex / pagerButtonCount) * pagerButtonCount + pagerButtonCount + 1; //[?] 
            pages.push(
                <li className="page-item" key={"nextN"}>
                    <a href={"nextN"} className="page-link next btn" onClick={(e) => this.pagerButtonClicked(nextN, e)}>
                        <span style={{ fontSize: '7pt' }}>{pagerButtonCount}+</span>
                    </a>
                </li >
            );
        }
        else {
            pages.push(
                <li className="page-item" key={"nextN"}>
                    <a href={"nextN"} className="page-link next btn disabled">
                        <span style={{ fontSize: '7pt' }}>{pagerButtonCount}+</span>
                    </a>
                </li >
            );
        }

        //@* 마지막 링크 *@
        if (pageNumber !== pageCount) {
            pages.push(
                <li className="page-item" key={"last"}>
                    <a href={"last"} className="page-link last btn" onClick={(e) => this.pagerButtonClicked(pageCount, e)}>
                        <span style={{ fontSize: '7pt' }}>LAST</span></a>
                </li >
            );
        }
        else {
            pages.push(
                <li className="page-item" key={"last"}>
                    <a href={"last"} className="page-link last btn disabled"><span style={{ fontSize: '7pt' }}>LAST</span></a>
                </li>
            );
        }

        return pages;
    }

    render() {
        const pages = this.displayData(); 
        return (
            <>
                <div className="d-flex">
                    <ul className="pagination pagination-sm mx-auto">
                        {pages}
                    </ul>
                </div>
            </>
        );
    }
}
