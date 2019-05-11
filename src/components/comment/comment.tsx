import React from 'react';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import {getAuthToken} from "../with_auth/with_auth";

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
  color: "black"
}

const scoreStyle: React.CSSProperties = {
  padding: "0px",
  height: "40px",
  fontWeight: "bold",
  fontSize: "18px",
}

export interface CommentDetails {
  id: number;
  userId: number;
  email: string;
  title: string;
  url: string;
  dateTime: string,
  voteCount: number | null;
  content: string;
}

interface CommentProps extends CommentDetails {
  // ...
}

interface CommentState {
  //
}

export class Comment extends React.Component<CommentProps, CommentState> {
  public render() {
    const {...item} = this.props;
    return (
      <Row style={rowStyle}>
        <Col xs={1} md={1} style={voteStyle}>
          <Col xs={12} md={12} style={{padding: "0px"}}>
            <i className="fas fa-arrow-alt-circle-up fa-2x" onClick={() => this._handleVotes(item.id, 'up')}/><br/>
          </Col>
          <Col xs={12} md={12} style={scoreStyle}>
            {item.voteCount ? item.voteCount : 0}<br/>
          </Col>
          <Col xs={12} md={12} style={{padding: "0px"}}>
            <i className="fas fa-arrow-alt-circle-down fa-2x" onClick={() => this._handleVotes(item.id, 'down')}/>
          </Col>
        </Col>

        <Col xs={11} md={11} style={entryStyle}>
          <Col xs={12} md={12} style={{textDecoration: 'none'}}>
            Posted by /u/{item.email} {this._renderTimeSinceDate(item.dateTime)}<br/><br/>
          </Col>
          <Col xs={12} md={12}>
            <h5>{item.content}</h5>
          </Col>
        </Col>
      </Row>
    );
  }

  private _handleVotes(linkId: number, voteType: string) {
    (async () => {
      try {
        const token = getAuthToken();
        if (token && voteType === 'up') {
          await upvoteLink(linkId, token);
        } else if (token && voteType === 'down') {
          await downvoteLink(linkId, token);
        } else {
          console.log('Vote can\'t be cast.');
        }
      } catch (err) {
        console.log('err', err);
        this.setState({error: err.error});
      }
    })();
  }

  private _renderTimeSinceDate(jsonDate: string) {
    const time = Date.parse(jsonDate);
    const now = new Date().getTime();
    const difference = (now - time) / 1000;
    const seconds = Math.ceil(difference);
    const minutes = Math.ceil(seconds / 60);
    const hours = Math.ceil(minutes / 60);
    const days = Math.ceil(hours / 24);
    if (seconds < 60) {
      return `${seconds} seconds`;
    } else if (minutes < 60) {
      return `${minutes} minutes`;
    } else if (hours < 24) {
      return `${hours} hours`;
    } else {
      return `${days} days`;
    }
  }
}

async function upvoteLink(linkId: number, jwt: string) {
  const response = await fetch(
    `/api/v1/links/${linkId}/upvote`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": jwt,
      },
    }
  );
}

async function downvoteLink(linkId: number, jwt: string) {
  const response = await fetch(
    `/api/v1/links/${linkId}/downvote`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": jwt,
      },
    }
  );
}