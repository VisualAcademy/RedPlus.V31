import React from 'react';

export class MapFunctionDemo extends React.Component {
    render() {

        const books = [
            { id: 1, title: 'C# 교과서' },
            { id: 2, title: 'ASP.NET Core를 다루는 기술' },
        ];


        return (
            <div>
                <h1>MapFunctionDemo</h1>
                {
                    books.map((book) => (
                        <div>{book.id} - {book.title}</div>
                    ))
                }
            </div>    
        );
    }
}
