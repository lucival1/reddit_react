import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const linkStyle: React.CSSProperties = {
    fontSize: "12px",
    height: "20px",
}

const commentStyle: React.CSSProperties = {
    fontSize: "9px",
}

const rowStyle: React.CSSProperties = {
    margin: "10px",
    border: "3px solid black",
    borderRadius: "5px",
}

const voteStyle: React.CSSProperties = {
    borderRight: "3px solid black",
    padding: "20px 10px 5px 10px",
    textAlign: "center",
    lineHeight: "30px",
    backgroundColor: "rgba(237, 239, 241, 0.8)",
}

const entryStyle: React.CSSProperties = {
    padding: "15px",
    background: "rgb(247, 248, 249)",
}

const scoreStyle: React.CSSProperties = {
    padding: "0px",
    height: "40px",
    fontWeight: "bold",
    fontSize: "18px",
}

interface LinkEntryProps {
    id: number;
    title: string;
    url: string;
    commentCount?: number;
    date?: string;
    userName?: string;
    userId?: number;
    score?: number;
    onUpvote?: any;
    onDownvote?: any;
}

export class LinkEntry extends React.Component<LinkEntryProps> {
    public render() {
        const {...item} = this.props;
        return (
            <Row style={ rowStyle }>
                <Col xs={1} md={1}
                     style={ voteStyle}
                >
                    <Col xs={12} md={12} style={{padding: "0px"}}>
                        <i className="fas fa-arrow-alt-circle-up fa-2x" onClick={ () => item.onUpvote() } /><br/>
                    </Col>
                    <Col xs={12} md={12} style={ scoreStyle }>
                        {item.score}<br/>
                    </Col>
                    <Col xs={12} md={12} style={{padding: "0px"}}>
                        <i className="fas fa-arrow-alt-circle-down fa-2x" onClick={ () => item.onDownvote() } />
                    </Col>
                </Col>

                <Col xs={11} md={11} style={ entryStyle }>
                    <Col xs={12} md={12}>
                        Posted by /u/{item.userName} x hours ago
                    </Col>
                    <Col xs={12} md={12}>
                        <h3>{item.title}</h3>
                    </Col>
                    <Col xs={12} md={12}>
                        <p style={linkStyle}>{item.url}</p>
                    </Col>
                    <Col xs={12} md={12}>
                        <p style={commentStyle}>{item.commentCount} comments</p>
                    </Col>
                </Col>
            </Row>
        );
    }
}