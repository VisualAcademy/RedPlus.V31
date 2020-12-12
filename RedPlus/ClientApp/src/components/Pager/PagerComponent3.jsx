import React, { Component } from 'react';
import { DulPagination } from '../Shared/DulPagination';

export class PagerComponent3 extends Component {
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
                <h1>Pager 3</h1>
                <DulPagination
                    pageIndexChanged={(pageIndex) => this.pageIndexChanged(pageIndex)}></DulPagination>
            </>
        );
    }
}
