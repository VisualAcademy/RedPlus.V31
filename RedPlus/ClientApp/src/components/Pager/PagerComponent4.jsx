import React, { Component } from 'react';
import { DulPagination } from '../Shared/DulPagination';

export class PagerComponent4 extends Component {
    constructor(props) {
        super(props);

        this.pageIndexChanged = this.pageIndexChanged.bind(this); 
    }
    pageIndexChanged(pageIndex) {
        console.log("Parent:", pageIndex); 
    }
    render() {
        return (
            <>
                <h1>Pager 4</h1>
                <DulPagination
                    pageNumber={11} pageSize={10} pagerButtonCount={5}
                    recordCount={119}
                    pageIndexChanged={(pageIndex) => this.pageIndexChanged(pageIndex)}></DulPagination>
            </>
        );
    }
}
