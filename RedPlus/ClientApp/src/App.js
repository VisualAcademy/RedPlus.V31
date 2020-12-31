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

// Entries
import { EntryIndex } from './components/Entries/EntryIndex';
import { EntryCreate } from './components/Entries/EntryCreate';
import { EntryDetails } from './components/Entries/EntryDetails';
import { EntryEdit } from './components/Entries/EntryEdit';
import { EntryDelete } from './components/Entries/EntryDelete';
import { EntryList } from './components/Entries/EntryList';

// Articles
import ReactRoadMap from './articles/ReactRoadMap';
import MapAndKey from './articles/MapAndKey';
import CheckBoxWithUseState from './articles/CheckBoxWithUseState';
import { SearchBoxTest } from './articles/SearchBoxTest';

// React Part 1
import { About } from './components/About';
import { Contact } from './components/Contact';
import { HelloComponent } from './components/Demos/HelloComponent';
import { StyleAttribute } from './components/Demos/StyleAttribute';
import { ClassNameDemo } from './components/Demos/ClassNameDemo/ClassNameDemo';
import MyComponent from './components/Demos/MyComponent';
import { PropsDemo } from './components/Demos/PropsDemo/PropsDemo';
import { PropsChildrenDemo } from './components/Demos/PropsChildrenDemo/PropsChildrenDemo';
import { DestructuringAssignmentDemo } from './components/Demos/DestructuringAssignmentDemo/DestructuringAssignmentDemo';
import { StateDemo } from './components/Demos/StateDemo/StateDemo';
import { StateObjectLiteral } from './components/Demos/StateObjectLiteral/StateObjectLiteral';
import { OnClickDemo } from './components/Demos/OnClickDemo/OnClickDemo';
import Ideas from './components/Ideas/Ideas';
import InlineStyle from './components/Demos/InlineStyles/InlineStyles';
import { OneWayBinding } from './components/Demos/OneWayBinding/OneWayBinding';
import { MapFunctionDemo } from './components/Demos/MapFunctionDemo/MapFunctionDemo';
import { MapFunctionBookList } from './components/Demos/MapFunctionBookList/MapFunctionBookList';
import StateDescription from './components/Demos/StateDescription/StateDescription';
import OnClickEventHandler from './components/Samples/OnClickEventHandler';
import FetchApiPractice from './components/Samples/FetchApiPractice';
import TextBoxOnChangeEventHandler from './components/Samples/TextBoxOnChangeEventHandler';
import ReactFragmentDemo from './components/Samples/ReactFragmentDemo';
import FunctionStateDemo from './components/Samples/FunctionStateDemo';
import UseEffectDemo from './components/Samples/UseEffectDemo';
import UseEffectFetchApi from './components/Samples/UseEffectFetchApi';
import TodoListInMemory from './components/TodoListInMemory';
import { PropsTypesDemo } from './components/Demos/PropsTypesDemo/PropsTypesDemo';

// Books 
import { BooksIndex } from './components/Books/BooksIndex';
import { BooksCreate } from './components/Books/BooksCreate';
import { BooksEdit } from './components/Books/BooksEdit';
import { BooksDelete } from './components/Books/BooksDelete';

// Pager 
import { PagerComponent1 } from './components/Pager/PagerComponent1';
import { PagerComponent2 } from './components/Pager/PagerComponent2';
import { PagerComponent3 } from './components/Pager/PagerComponent3';
import { PagerComponent4 } from './components/Pager/PagerComponent4';
import { PagerComponent6 } from './components/Pager/PagerComponent6';
import { PagerComponent7 } from './components/Pager/PagerComponent7';
import { PagerComponent } from './components/Pager/PagerComponent';

export default class App extends Component {
    static displayName = App.name;

    render() {
        return (
            <Layout>
                <Route exact path='/' component={Home} />
                <Route path='/counter' component={Counter} />
                <AuthorizeRoute path='/fetch-data' component={FetchData} />
                <Route path={ApplicationPaths.ApiAuthorizationPrefix} component={ApiAuthorizationRoutes} />

                {/* Entries */}
                <Route path={['/Entries', '/Entries/Index']} component={EntryIndex} exact />
                <Route path='/Entries/Create' component={EntryCreate} />
                <Route path='/Entries/Details/:id' component={EntryDetails} />
                <Route path='/Entries/Edit/:id' component={EntryEdit} />
                <Route path='/Entries/Delete/:id' component={EntryDelete} />
                <Route path='/Entries/List' component={EntryList} />

                {/* Articles */}
                <Route path="/Articles/ReactRoadMap" component={ReactRoadMap} /> 
                <Route path="/Articles/MapAndKey" component={MapAndKey} /> 
                <Route path="/Articles/CheckBoxWithUseState" component={CheckBoxWithUseState} /> 
                <Route path="/Articles/SearchBoxTest" component={SearchBoxTest} /> 

                {/* React Part 1 */}
                <Route path='/about' component={About} />
                <Route path='/contact' component={Contact} />
                <Route path="/UseEffectFetchApi" component={UseEffectFetchApi} />
                <Route path='/FunctionStateDemo' component={FunctionStateDemo} />
                <Route path="/UseEffectDemo" component={UseEffectDemo} />
                <Route path='/hellocomponent' component={HelloComponent} />
                <Route path='/StyleAttribute' component={StyleAttribute} />
                <Route path="/ClassNameDemo" component={ClassNameDemo} />
                <Route path="/MyComponent" component={MyComponent} />
                <Route path="/PropsDemo" component={PropsDemo} />
                <Route path="/PropsChildrenDemo" component={PropsChildrenDemo} />
                <Route path='/PropsTypesDemo' component={PropsTypesDemo} />
                <Route path='/DestructuringAssignmentDemo' component={DestructuringAssignmentDemo} />
                <Route path='/StateDemo' component={StateDemo} />
                <Route path="/StateDescription" component={StateDescription} />
                <Route path='/StateObjectLiteral' component={StateObjectLiteral} />
                <Route path='/OnClickDemo' component={OnClickDemo} />
                <Route path="/OnClickEventHandler" component={OnClickEventHandler} />
                <Route path='/Ideas' component={Ideas} />
                <Route path='/InlineStyles' component={InlineStyle} />
                <Route path='/TodoListInMemory' component={TodoListInMemory} />
                <Route path='/OneWayBinding' component={OneWayBinding} />
                <Route path='/MapFunctionDemo' component={MapFunctionDemo} />
                <Route path='/MapFunctionBookList' component={MapFunctionBookList} />
                <Route path='/FetchApiPractice' component={FetchApiPractice} />
                <Route path='/TextBoxOnChangeEventHandler' component={TextBoxOnChangeEventHandler} />
                <Route path='/ReactFragmentDemo' component={ReactFragmentDemo} />

                {/* Books */}
                <Route path={['/Books', '/Books/Index']} component={BooksIndex} exact />
                <Route path='/Books/Create' component={BooksCreate} exact={true} />
                <Route path='/Books/Edit/:id' component={BooksEdit} exact />
                <Route path='/Books/Delete/:id' component={BooksDelete} exact />

                {/* Pager */}
                <Route path='/pager1' component={PagerComponent1} />
                <Route path='/pager2' component={PagerComponent2} />
                <Route path='/pager3' component={PagerComponent3} />
                <Route path='/pager4' component={PagerComponent4} />
                <Route path='/pager6' component={PagerComponent6} />
                <Route path='/pager7' component={PagerComponent7} />
                <Route path='/pager' component={PagerComponent} />

            </Layout>
        );
    }
}
