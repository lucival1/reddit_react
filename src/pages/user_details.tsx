import * as React from "react";
import { getAuthToken } from "../components/with_auth/with_auth";
import { Comment } from "../components/comment/comment";
import { Listview } from "../components/listview/listview";
import { LinkEntry } from "../components/link_entry/link_entry";
import { UserProfile } from "../components/user_profile/user_profile";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const UserDetailsStyle: React.CSSProperties = {
  background: "rgb(100, 109, 115, 0.7)",
  marginTop: "4.3em"
};

interface UserDetailsItem {
  id: number;
  bio: string;
  email: string;
  pic: string;
  links: [];
  comments: [];
}

interface UserDetailsProps {
}

interface UserDetailsState {
  userDetails: UserDetailsItem | null;
}

export class UserDetails extends React.Component<UserDetailsProps, UserDetailsState> {
  public constructor(props: UserDetailsProps) {
    super(props);
    this.state = {
      userDetails: null,
    };
  }

  public componentWillMount() {
    (async () => {
      const token = getAuthToken();
      if (token) {
        const userData = await getUserData(token);
        this.setState({userDetails: userData});
      }
    })();
  }

  public render() {
    if (this.state.userDetails === null) {
      return (
        <Container style={UserDetailsStyle} fluid={true}>
          <Row>
            <Col xs={12} md={12}>
              Loading...
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container style={UserDetailsStyle} fluid={true}>
          <Row>
            <Col xs={2} md={2}/>
            <Col xs={6} md={6}>
              {this._renderLinks(this.state.userDetails.links)}
              {this._renderComments(this.state.userDetails.comments)}
            </Col>
            <Col xs={3} md={3}>
              <UserProfile
                email={this.state.userDetails.email}
                bio={this.state.userDetails.bio}
                pic={this.state.userDetails.pic}
              />
            </Col>
          </Row>
        </Container>
      );
    }
  }

  private _renderLinks(links: []) {
    return (
      <React.Fragment>
        <h3 style={{ marginTop: "15px" }}>LINKS</h3>
        <Listview
          items={
            links.map((link, linkIndex) => {
              return <LinkEntry key={linkIndex} {...link} />
            })
          }
        />
      </React.Fragment>
    );
  }

  private _renderComments(comments: []) {
    return (
      <React.Fragment>
        <h3>COMMENTS</h3>
        <Listview
          items={
            comments.map((comment, commentIndex) => {
              return <Comment key={commentIndex} {...comment} />
            })
          }
        />
      </React.Fragment>
    );
  }
}

async function getUserData(token: string) {
  const response = await fetch(
    "/api/v1/auth/profile",
    {
      method: "POST",
      headers: {
        "x-auth-token": token
      }
    }
  );
  const json = await response.json();
  return json as UserDetailsItem;
}