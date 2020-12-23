// @page "/Entries/List"
import React, { Component } from 'react';
import axios from 'axios';

export class EntryList extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: [],
            loading: true
        };

        // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
        // https://ko.reactjs.org/docs/handling-events.html
        this.navigateToCreate = this.navigateToCreate.bind(this);
        this.editBy = this.editBy.bind(this);
        this.deleteBy = this.deleteBy.bind(this);
        this.deleteDirectBy = this.deleteDirectBy.bind(this); 
        this.detailsBy = this.detailsBy.bind(this);
        this.detailsLink = this.detailsLink.bind(this);
    }

    // 페이지 로드, OnInitialized()
    // 페이지가 로드되었을 때 Web API 호출해서 JSON 데이터 가져오기: OnInitialized() 
    componentDidMount() {
        this.displayData();
        //this.getEntriesDataWithFetch();
    }

    render() {
        let contents = this.state.loading
            ? (<p><em>Loading...</em></p>)
            : (this.renderEntriesTable(this.state.entries));

        return (
            <>
                <h1>List <button className="btn btn-sm btn-primary"
                    onClick={this.navigateToCreate}><span className="fa fa-plus">+</span></button></h1>
                <div style={{ fontStyle: "italic" }}>게시판 리스트 페이지입니다.</div>
                {contents}
            </>
        );
    }

    // 글쓰기 페이지로 이동
    navigateToCreate() {
        //const { history } = this.props;
        //history.push('/Entries/Create'); 
        this.props.history.push('/Entries/Create');
    }

    //[!] Web API로부터 데이터 가져오기 
    async displayData() {
        const response = await axios.get("/api/Entries");
        const data = response.data;
        if (data) {
            this.setState({ entries: data, loading: false });
        }
    }

    // 학습용 게시판 리스트 테이블 출력
    renderEntriesTable(entries) {
        return (
            <table className='table table-striped' aria-labelledby="tableLabel">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Title</th>
                        <th>Name</th>
                        <th>Content</th>
                        <th>Created</th>
                        <th>Action, Admin</th>
                    </tr>
                </thead>
                <tbody>
                    {entries.map(entry => (
                        <tr key={entry.id}>
                            <td>{entry.id}</td>
                            <td>
                                <a href={`/Entries/Details/${entry.id}`}
                                    onClick={(e) => this.detailsLink(entry.id, e)}>{entry.title}</a>
                            </td>
                            <td>{entry.name}</td>
                            <td>{entry.content}</td>
                            <td>{entry.created ? new Date(entry.created).toLocaleDateString() : "-"}</td>
                            <td className="text-nowrap">
                                <button className="btn btn-sm btn-secondary"
                                    onClick={() => this.detailsBy(entry.id)}>Details</button>
                                &nbsp;
                                <button className="btn btn-sm btn-primary"
                                    onClick={() => this.editBy(entry.id)}>Edit</button>
                                &nbsp;
                                <button className="btn btn-sm btn-danger"
                                    onClick={() => this.deleteBy(entry.id)}>Delete</button>
                                &nbsp;
                                <button className="btn btn-sm btn-danger"
                                    onClick={() => this.deleteDirectBy(entry.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    }

    detailsBy(id) {
        const { history } = this.props;
        history.push("/Entries/Details/" + id);
    }

    detailsLink(id, e) {
        e.preventDefault(); // 이벤트 기본 작업 방지: 버튼, 링크 등의 고유 기능을 제거하고 React 기능만 사용
        const { history } = this.props;
        history.push("/Entries/Details/" + id);
    }

    editBy(id) {
        const { history } = this.props;
        history.push("/Entries/Edit/" + id);
    }

    deleteBy(id) {
        const { history } = this.props;
        history.push(`/Entries/Delete/${id}`);
    }

    // 학습용 직접 삭제 메서드
    deleteDirectBy(id) {
        if (window.confirm("Delete?")) {
            fetch("/api/Entries/" + id, { method: 'delete' }).then(result => {
                // 인메모리의 상태 데이터 업데이트
                this.setState({
                    entries: this.state.entries.filter((en) => {
                        return en.id !== id; 
                    })
                })
            });
        }
    }

    //[!] 참고: Web API 호출하는 3가지 모양 
    //[1] Fetch API 
    async populateEntriesData() {
        const response = await fetch('/api/Entries');
        const data = await response.json();
        this.setState({ entries: data, loading: false });
    }
    //getEntriesDataWithFetch() {
    //    fetch("/api/Entries")
    //        .then(response => response.json())
    //        .then(data => data
    //            ? this.setState({ entries: data, loading: false })
    //            : this.setState({ entries: {}, loading: true }));
    //}
    //[2] Axios + Async
    populateEntriesDataWithAxios() {
        axios.get("/api/Entries").then(response => {
            const data = response.data;
            this.setState({ entries: data, loading: false });
        });
    }
    //[3] Axios + Async
    async populateEntriesDataWithAxiosAsync() {
        const response = await axios.get("/api/Entries");
        const data = response.data;
        if (data) {
            this.setState({ entries: data, loading: false });
        }
    }
}
