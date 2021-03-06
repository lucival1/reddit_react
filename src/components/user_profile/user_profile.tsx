import * as React from "react";
import { getAuthToken } from "../with_auth/with_auth";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";
import Spinner from "react-bootstrap/Spinner";

const userProfileBoxStyle: React.CSSProperties = {
  margin: "10px",
  marginTop: "58px",
  border: "3px solid black",
  borderRadius: "5px",
  background: "rgb(247, 248, 249)"
}

const userProfileImageStyle: React.CSSProperties = {
  width: "171px",
  height: "180px",
  padding: "15px"
}

const userProfileContentStyle: React.CSSProperties = {
  fontSize: "1.15rem",
  lineHeight: "1.5",
  padding: "15px"
}

const userProfileLoadingStyle: React.CSSProperties = {
  height: "-webkit-fill-available",
  marginTop: "75px",
  textAlign: "center",
  fontWeight: "bold",
  fontSize: "28px"
};

interface UserProfileProps {
  email: string;
  bio: string;
  pic: string;
}

interface UserProfileState {
}

export class UserProfile extends React.Component<UserProfileProps, UserProfileState> {
  public constructor(props: UserProfileProps) {
    super(props);
  }

  public render() {
    const token = getAuthToken();
    if (token) {
      return (
        <div>
          {this._renderUserDetails()}
        </div>
      );
    } else {
      return (
        <div>This page is private!</div>
      );
    }
  }

  private _renderUserDetails() {
    if (this.props === null) {
      return (
        <Row>
          <Col xs={12} md={12} style={userProfileLoadingStyle}>
            <Spinner animation="grow" />Loading...
          </Col>
        </Row>
      );
    } else {
      return (
        <Col xs={12} md={12} style={userProfileBoxStyle}>
          <Row>
            <Image src={this.props.pic} style={userProfileImageStyle}
                   rounded/>
          </Row>
          <Row>
            <div style={userProfileContentStyle}>{this.props.email}</div>
          </Row>
          <Row>
            <div style={userProfileContentStyle}>{this.props.bio}</div>
          </Row>
        </Col>
      );
    }
  }
}