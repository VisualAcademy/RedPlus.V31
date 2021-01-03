import React, { Component } from 'react';

export class SearchBox extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchQuery: ""
        }
        this.searchQueryChanged = this.searchQueryChanged.bind(this); 
        this.sendSearchQuery = this.sendSearchQuery.bind(this); 
    }
    sendSearchQuery() {
        this.props.searchQueryChanged(this.state.searchQuery); 
    }
    searchHandler = this.debounce(() => {
        //console.log('Child:', this.state.searchQuery); 
        this.sendSearchQuery(); 
    }, 300)
    searchQueryChanged(e) {
        const qry = e.target.value;
        this.setState({searchQuery: qry});
        //console.log(qry); 
        this.searchHandler(); 
    }
    debounce(fn, interval) {
        let debounceTimer
        return _ => {
            clearTimeout(debounceTimer)
            debounceTimer = setTimeout(_ => {
                debounceTimer = null
                fn.apply(this, arguments)
            }, interval)
        };
    }
    render() {
        return (
            <>
                <div className="input-group mb-3">
                    <input className="form-control form-control-sm form-control-borderless" 
                        type="search" placeholder="Search topics or keywords" aria-describedby="btnSearch"
                        value={this.state.searchQuery}
                        onChange={this.searchQueryChanged}
                    />
                    <div className="input-group-append">
                        <button className="btn btn-sm btn-success" type="button" 
                        onClick={this.sendSearchQuery}>Search</button>
                    </div>
                </div>
            </>
        );
    }
}
