import React from 'react';
import { getAuthToken } from "../with_auth/with_auth";
import { Link } from "react-router-dom";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const linkStyle: React.CSSProperties = {
  fontSize: "12px",
  height: "20px",
  textDecoration: 'none',
  color: 'black',
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
  color: "black"
}

const scoreStyle: React.CSSProperties = {
  padding: "0px",
  height: "40px",
  fontWeight: "bold",
  fontSize: "18px",
}

interface LinkEntryProps {
  id: number;
  userId: number;
  email: string;
  title: string;
  url: string;
  dateTime: string,
  commentCount: number | null;
  voteCount: number | null;
}

export class LinkEntry extends React.Component<LinkEntryProps> {
  public render() {
    const {...item} = this.props;
    return (
      <Row style={rowStyle}>
        <Col xs={1} md={1} style={voteStyle}>
          <Col xs={12} md={12} style={{ padding: "0px" }}>
            <i className="fas fa-arrow-alt-circle-up fa-2x" onClick={() => this._handleVotes(item.id, 'up')}/><br/>
          </Col>
          <Col xs={12} md={12} style={scoreStyle}>
            {item.voteCount ? item.voteCount : 0}<br/>
          </Col>
          <Col xs={12} md={12} style={{ padding: "0px" }}>
            <i className="fas fa-arrow-alt-circle-down fa-2x" onClick={() => this._handleVotes(item.id, 'down')}/>
          </Col>
        </Col>

        <Col xs={11} md={11} style={entryStyle}>
          <Link to={`/link/${item.id}`} style={linkStyle}>
            <Col xs={12} md={12} style={{ textDecoration: 'none' }}>
              Posted by /u/{item.email} {this._renderTimeSinceDate(item.dateTime)}
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
          </Link>
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