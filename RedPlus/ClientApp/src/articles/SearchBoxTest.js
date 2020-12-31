import React, { Component } from 'react';
import { SearchBox } from '../components/Shared/SearchBox';

export class SearchBoxTest extends Component {
    constructor(props) {
        super(props); 
        this.state = { 
            searchQuery: '' 
        };
        this.searchQueryChanged = this.searchQueryChanged.bind(this); 
    }
    searchQueryChanged(searchQuery) {
        this.setState({searchQuery: searchQuery});
        console.log("Parent:", searchQuery);
    }
    render() {
        return (
            <>
                <h1>SearchBox Component Test</h1>
                <SearchBox searchQueryChanged={(searchQuery) => this.searchQueryChanged(searchQuery)}>
                </SearchBox>
            </>
        );
    }
}
