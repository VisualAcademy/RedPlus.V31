import React from 'react';

function Demo1() {
    return (
        <div>
            <h2>React</h2><h2>Angular</h2>
        </div>
    );
}

function Demo2() {
    return (
        <React.Fragment>
            <h2>Vue</h2><h2>Blazor</h2>
        </React.Fragment>
    );
}

function Demo3() {
    return (
        <>
            <h2>ASP.NET Core</h2><h2>Spring Boot</h2>
        </>
    );
}

function ReactFragmentDemo() {
    return (
        <>
            <Demo1 /><Demo2 /><Demo3 />
        </>
    );
}

export default ReactFragmentDemo;
