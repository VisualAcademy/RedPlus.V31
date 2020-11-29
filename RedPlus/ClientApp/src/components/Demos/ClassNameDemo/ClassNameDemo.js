import React, { Component } from "react";
import './ClassNameDemo.css';

export class ClassNameDemo extends React.Component {
    render() {
        return (
            <div>
                <h1>className를 사용하여 CSS Class 지정하기</h1>
                <div className="ClassNameDemo">
                    스타일 적용 영역
                </div>
            </div>
        );
    }
}