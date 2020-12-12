import React, { Component } from 'react';
import { DulPagination } from '../Shared/DulPagination';

export class PagerComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pageNumber: 1,
            pageSize: 10, 
            pagerButtonCount: 5,
            recordCount: 0,
            pageIndex: 0
        };
        this.pageIndexChanged = this.pageIndexChanged.bind(this); 
        this.displayData = this.displayData.bind(this); 
    }
    displayData() { }
    componentDidMount() {
        this.displayData(); 
        const recordCount = 1191;
        this.setState({ recordCount: recordCount });
    }
    pageIndexChanged(pageIndex) {
        this.setState({ pageIndex: pageIndex, pageNumber: (pageIndex + 1) });
        this.displayData(); 
    }
    render() {
        return (
            <>
                <h1>Pager Component Test</h1>
                <DulPagination
                    pageNumber={this.state.pageNumber}
                    pageSize={this.state.pageSize}
                    pagerButtonCount={this.state.pagerButtonCount}
                    recordCount={this.state.recordCount}
                    pageIndexChanged={(pageIndex) => this.pageIndexChanged(pageIndex)}></DulPagination>
            </>
        );
    }
}
