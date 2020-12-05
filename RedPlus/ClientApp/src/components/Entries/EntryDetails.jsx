// @page "/Entries/Details/:id"
import React, { Component } from 'react';
import axios from 'axios';

export class EntryDetails extends Component {
    constructor(props) {
        super(props);

        // 컴포넌트 상태 데이터 
        this.state = {
            id: 0,
            name: '',
            title: "",
            content: "",
            created: ""
        };

        // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
        // https://ko.reactjs.org/docs/handling-events.html
        this.navigateToIndex = this.navigateToIndex.bind(this);
        this.navigateToDelete = this.navigateToDelete.bind(this); 
        this.navigateToEdit = this.navigateToEdit.bind(this); 
    }

    // 페이지 로드, OnInitialized()
    componentDidMount() {
        //[!] id Parameter 받기
        const { id } = this.props.match.params;

        //[!] id 값에 해당하는 단일 데이터를 Web API로부터 읽어오기
        axios.get("/api/Entries/" + id).then(response => {
            const data = response.data;

            this.setState({
                id: data.id,
                name: data.name,
                title: data.title,
                content: data.content,
                created: data.created
                    ? new Date(data.created).toISOString().slice(0, 10)
                    : ""
            });
        });
    }

    render() {
        return (
            <>
                <h1>Details</h1>
                <div className="row">
                    <div className="col-md-8">
                        <div className="form-group">
                            <label>ID</label>
                            <input type="text" className="form-control" value={this.state.id} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control"
                                placeholder="Enter Name" value={this.state.name} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control"
                                value={this.state.title} readOnly />
                        </div>
                        <div className="form-group">
                            <label>Content</label>
                            <textarea className="form-control"
                                value={this.state.content}
                                rows="5" readOnly
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label>Created</label>
                            <input type="text" className="form-control"
                                value={this.state.created} readOnly
                            />
                        </div>
                        <div className="form-group">
                            <button type="button" className="btn btn-primary" onClick={this.navigateToEdit}>Edit</button>&nbsp;
                            <button type="button" className="btn btn-primary" onClick={this.navigateToDelete}>Delete</button>&nbsp;
                            <button className="btn btn-secondary" onClick={this.navigateToIndex}>List</button>
                        </div>
                    </div>
                </div>
            </>
        );
    }

    // 리스트 페이지로 이동
    navigateToIndex() {
        const { history } = this.props;
        history.push('/Entries');
    }

    // 삭제 페이지로 이동
    navigateToDelete() {
        const { id } = this.props.match.params;

        const { history } = this.props;
        history.push('/Entries/Delete/' + id);
    }

    // 수정 페이지로 이동
    navigateToEdit() {
        const { id } = this.props.match.params;

        const { history } = this.props;
        history.push('/Entries/Edit/' + id);
    }
}
