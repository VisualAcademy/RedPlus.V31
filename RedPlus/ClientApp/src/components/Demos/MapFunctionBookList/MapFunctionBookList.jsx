import React from 'react';

// yield return
const displayBookList = (bookList) => {
    return bookList.map((lst) => {
        return `${lst.title}: ${lst.price}원`; 
    });
}

export class MapFunctionBookList extends React.Component {
    render() {
        const books = [
            { id: 1, title: 'C# 교과서', price: 30000 },
            { id: 2, title: 'ASP.NET Core를 다루는 기술', price: 55000 },
        ];

        const booksList = displayBookList(books); 

        return (
            <div>
                <h1>MapFunctionDemo</h1>
                {booksList.map((lst) => (<div>{lst}</div>))}
            </div>    
        );
    }
}
