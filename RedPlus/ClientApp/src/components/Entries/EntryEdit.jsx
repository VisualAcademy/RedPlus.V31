// @page "/Entries/Edit/:id"
import React, { Component } from 'react';
import axios from 'axios';

export class EntryEdit extends Component {
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
        this.navigateToDetails = this.navigateToDetails.bind(this); 

        //[!] 이벤트 바인딩
        //[1] 함수로 이벤트 처리기 만들고 생성자에서 바인딩
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChageName = this.handleChageName.bind(this);

        //[2] 화살표 함수(람다 식)로 이벤트 핸들러 바인딩
        //this.handleChageTitle = this.handleChageTitle.bind(this); 
        //this.handleChageContent = this.handleChageContent.bind(this); 
    }

    // 페이지 로드, OnInitialized()
    componentDidMount() {
        //[!] id Parameter 받기
        //const id = this.props.match.params["id"]; // 이 방법도 사용 가능
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

    // 게시판 수정 버튼 클릭 이벤트
    handleSubmit(e) {
        e.preventDefault(); // 이벤트 기본 작업 방지: 버튼, 링크 등의 고유 기능을 제거하고 React 기능만 사용

        const { id } = this.props.match.params; 

        let entryDto = {
            //name: this.state.name,
            name: this.refs.txtName.value,
            title: this.state.title,
            content: this.state.content,
            created: this.state.created, // Created는 처음 가져온 것 그대로 설정 
        };

        axios.put(`/api/Entries/${id}`, entryDto).then(result => {
            this.navigateToIndex();
        });
    }

    //[1] 함수로 이벤트 처리기 만들고 생성자에서 바인딩
    handleChageName(e) {
        this.setState({
            name: e.target.value
        });
    }

    //[2] 화살표 함수(람다 식)로 이벤트 핸들러 바인딩
    handleChageTitle = (e) => {
        this.setState({
            title: e.target.value
        });
    }
    handleChageContent = (event) => {
        this.setState({
            content: event.target.value
        });
    }

    render() {
        return (
            <>
                <h3>Edit</h3>

                <div className="row">
                    <div className="col-md-8">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <label>ID</label>
                                <input type="text" className="form-control" value={this.state.id} readOnly />
                            </div>
                            <div className="form-group">
                                <label htmlFor="txtName">Name</label>
                                <input type="text" className="form-control"
                                    placeholder="Enter Name"
                                    defaultValue={this.state.name}
                                    ref="txtName"
                                />
                            </div>
                            <div className="form-group">
                                <label>Title</label>
                                <input type="text" className="form-control"
                                    placeholder="Enter Title" value={this.state.title}
                                    onChange={this.handleChageTitle}
                                />
                            </div>
                            <div className="form-group">
                                <label>Content</label>
                                <textarea className="form-control"
                                    placeholder="Enter Content" value={this.state.content}
                                    onChange={this.handleChageContent.bind(this)}
                                    rows="5"
                                ></textarea>
                            </div>
                            <div className="form-group">
                                <button type="submit" className="btn btn-primary">Edit</button>&nbsp;
                                <button type="button" className="btn btn-primary" onClick={this.navigateToDetails}>Cancel</button>&nbsp;
                                <button className="btn btn-secondary" onClick={this.navigateToIndex}>List</button>
                            </div>
                        </form>
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

    // 상세보기 페이지로 이동
    navigateToDetails() {
        const { id } = this.props.match.params;

        const { history } = this.props;
        history.push('/Entries/Details/' + id);
    }
}
