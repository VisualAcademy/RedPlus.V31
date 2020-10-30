import React, { Component } from 'react';
import { Route } from 'react-router';
import { Layout } from './components/Layout';
import { Home } from './components/Home';
import { FetchData } from './components/FetchData';
import { Counter } from './components/Counter';
import AuthorizeRoute from './components/api-authorization/AuthorizeRoute';
import ApiAuthorizationRoutes from './components/api-authorization/ApiAuthorizationRoutes';
import { ApplicationPaths } from './components/api-authorization/ApiAuthorizationConstants';

import './custom.css'
import { EntryIndex } from './components/Entries/EntryIndex';
import { EntryCreate } from './components/Entries/EntryCreate';
import { EntryDetails } from './components/Entries/EntryDetails';
import { EntryEdit } from './components/Entries/EntryEdit';
import { EntryDelete } from './components/Entries/EntryDelete';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <AuthorizeRoute path='/fetch-data' component={FetchData} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />

                <Route path={['/Entries', '/Entries/Index']} component={EntryIndex} exact />
                <Route path='/Entries/Create' component={EntryCreate} />
                <Route path='/Entries/Details/:id' component={EntryDetails} />
                <Route path='/Entries/Edit/:id' component={EntryEdit} />
                <Route path='/Entries/Delete/:id' component={EntryDelete} />

            </Layout>
        );
    }
}
