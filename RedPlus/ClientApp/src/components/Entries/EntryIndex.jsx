// @page "/Entries"
// @page "/Entries/Index"
import React, { Component } from 'react';
import axios from 'axios';
import { DulPagination } from '../Shared/DulPagination';
import { SearchBox } from '../Shared/SearchBox';

export class EntryIndex extends Component {
    constructor(props) {
        super(props);

        this.state = {
            entries: [],
            loading: true,

            pageNumber: 1,
            pageSize: 5,
            pagerButtonCount: 5,
            recordCount: 0,
            pageIndex: 0, 

            searchQuery: ''
        };

        // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
        // https://ko.reactjs.org/docs/handling-events.html
        this.navigateToCreate = this.navigateToCreate.bind(this);
        this.editBy = this.editBy.bind(this);
        this.deleteBy = this.deleteBy.bind(this);
        this.deleteDirectBy = this.deleteDirectBy.bind(this); 
        this.detailsBy = this.detailsBy.bind(this);
        this.detailsLink = this.detailsLink.bind(this);

        // Pagination
        this.pageIndexChanged = this.pageIndexChanged.bind(this); 
        this.displayData = this.displayData.bind(this); 

        // Search
        this.searchQueryChanged = this.searchQueryChanged.bind(this); 
    }

    // 페이지 로드, OnInitialized()
    // 페이지가 로드되었을 때 Web API 호출해서 JSON 데이터 가져오기: OnInitialized() 
    componentDidMount() {
        this.displayData();
        //this.getEntriesDataWithFetch();
        //const recordCount = 1191;
        //this.setState({ recordCount: recordCount });
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
                <div className="table-responsive">
                    {contents}
                </div>
                <div className="col-md-12">
                    <DulPagination
                        pageNumber={this.state.pageNumber}
                        pageSize={this.state.pageSize}
                        pagerButtonCount={this.state.pagerButtonCount}
                        recordCount={this.state.recordCount}
                        pageIndexChanged={(pageIndex) => this.pageIndexChanged(pageIndex)}>
                    </DulPagination>
                </div>
                <div className="col-md-12">
                    <SearchBox searchQueryChanged={(searchQuery) => this.searchQueryChanged(searchQuery)}>
                    </SearchBox>
                </div>
            </>
        );
    }

    async searchQueryChanged(searchQuery) {
        await this.setState({ searchQuery: searchQuery });
        console.log("Search:", searchQuery);
        this.displayData(); 
    }

    async pageIndexChanged(pageIndex) {
        let pageNumber = pageIndex + 1;
        await this.setState({ pageIndex: pageIndex, pageNumber: pageNumber });
        this.displayData(); 
        //const response = await axios.get(`/api/Entries/Page/${pageNumber}/${this.state.pageSize}`);
        //const data = response.data;
        //if (data) {
        //    this.setState({ entries: data, loading: false, recordCount: response.headers["x-totalrecordcount"] });
        //}
    }

    // 글쓰기 페이지로 이동
    navigateToCreate() {
        //const { history } = this.props;
        //history.push('/Entries/Create'); 
        this.props.history.push('/Entries/Create');
    }

    //[!] Web API로부터 데이터 가져오기 
    async displayData() {
        let WEB_API_URI = "";
        if (this.state.searchQuery !== '') {
            WEB_API_URI = `/api/Entries/Search/${this.state.pageNumber}/${this.state.pageSize}?searchQuery=${this.state.searchQuery}`;
        }
        else {
            WEB_API_URI = `/api/Entries/Page/${this.state.pageNumber}/${this.state.pageSize}`;
        }

        const response = await axios.get(WEB_API_URI);
        const data = response.data;
        if (data) {
            this.setState({ entries: data, loading: false, recordCount: response.headers["x-totalrecordcount"]});
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
