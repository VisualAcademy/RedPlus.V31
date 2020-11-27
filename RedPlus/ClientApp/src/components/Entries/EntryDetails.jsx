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
            created: null
        };

        // 콜백에서 `this`가 작동하려면 아래와 같이 바인딩 해주어야 합니다.
        // https://ko.reactjs.org/docs/handling-events.html
        this.navigateToIndex = this.navigateToIndex.bind(this);
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
                    : null
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
                            <input type="text" className="form-control" value={this.state.id}
                            />
                        </div>
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" className="form-control"
                                placeholder="Enter Name" value={this.state.name}
                            />
                        </div>
                        <div className="form-group">
                            <label>Title</label>
                            <input type="text" className="form-control"
                                value={this.state.title}
                            />
                        </div>
                        <div className="form-group">
                            <label>Content</label>
                            <textarea className="form-control"
                                value={this.state.content}
                                rows="5"
                            ></textarea>
                        </div>
                        <div className="form-group">
                            <label>Created</label>
                            <input type="text" className="form-control"
                                value={this.state.created}
                            />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="btn btn-primary">Edit</button>
                                &nbsp;
                                <button type="submit" className="btn btn-primary">Delete</button>
                                &nbsp;
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
}
