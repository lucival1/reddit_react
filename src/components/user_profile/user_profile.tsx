import * as React from "react";
import {getAuthToken} from "../with_auth/with_auth";
import Col from "react-bootstrap/Col";
import Image from "react-bootstrap/Image";
import Row from "react-bootstrap/Row";

const userProfileImageStyle: React.CSSProperties = {
  width: "171px",
  height: "180px",
  padding: "15px"
}

const userProfileContentStyle: React.CSSProperties = {
  fontSize: "1.15rem",
  lineHeight: "1.5",
  color: "white",
  padding: "15px"
}

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
      return <div>Loading...</div>
    } else {
      return (
        <Col xs={12} md={12}>
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