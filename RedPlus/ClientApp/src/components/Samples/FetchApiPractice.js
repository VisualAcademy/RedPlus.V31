import React, { Component } from 'react';

class FetchApiPractice extends Component {
    constructor() {
        super();
        this.state = { forecasts: [], loading: true };
    }

    componentDidMount() {
        this.setState({ loading: true });
        fetch("/weatherforecast")
            .then(response => response.json())
            .then(data => { this.setState({ forecasts: data, loading: false }); });
    }

    static displayData(forecasts) {
        return (
            <table className="table table-bordered">
                <tbody>
                    {forecasts.map(forecast =>
                        <tr key={forecast.date}>
                            <td>{forecast.date}</td><td>{forecast.temperatureC}</td>
                        </tr>
                    )}
                </tbody>
            </table>
        );
    }

    render() {
        let contents = this.state.loading ? <p>loading...</p> : FetchApiPractice.displayData(this.state.forecasts);
        return (<>
            {contents}
        </>);
    }
}

export default FetchApiPractice;
