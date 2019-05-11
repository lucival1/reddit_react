import * as React from "react";
import {LinkDetails as LinkDetailsComponent} from "../components/link_details/link_details";
import {withRouter} from "react-router";
import {Comment, CommentDetails} from "../components/comment/comment";
import {Listview} from "../components/listview/listview";
import {getAuthToken} from "../components/with_auth/with_auth"
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

interface LinkData {
  id: number;
  userId: number;
  email: string;
  title: string;
  url: string;
  dateTime: string;
  commentCount: number | null;
  voteCount: number | null;
  comments: CommentDetails[]
}

interface LinkDetailsProps {
  linkId: string;
}

interface LinkDetailsState {
  link: LinkData | null;
  newCommentContent: string
}

export class LinkDetailsInternal extends React.Component<LinkDetailsProps, LinkDetailsState> {
  public constructor(props: LinkDetailsProps) {
    super(props);
    this.state = {
      link: null,
      newCommentContent: ""
    };
  }

  public componentWillMount() {
    (async () => {
      const data = await getData(this.props.linkId);
      this.setState({link: data});
    })();
  }

  public render() {
    if (this.state.link === null) {
      return <div>Loading...</div>;
    } else {
      return (
        <Container style={{background: "rgb(100, 109, 115, 0.7)", marginTop: "4.3em"}} fluid={true}>
          <Row>
            <Col xs={2} md={2}/>
            <Col xs={7} md={7}>
              <LinkDetailsComponent {...this.state.link} />
              <Listview
                items={
                  this.state.link.comments.map((comment, commentIndex) => {
                    return (
                      <Comment key={commentIndex} {...comment} />
                    );
                  })
                }
              />
              {this._renderCommentEditor()}
            </Col>
          </Row>
        </Container>
      );
    }
  }

  private _renderCommentEditor() {
    const token = getAuthToken();
    if (token) {
      return (
        <React.Fragment>
          <Form>
            <Row>
              <Col xs={12} md={12}>
                <Form.Group controlId="newComment.Textarea">
                  <Form.Control as="textarea" rows="5" placeholder="Enter new comment"
                                value={this.state.newCommentContent}
                                onChange={(e: any) => this.setState({newCommentContent: e.currentTarget.value})}
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col xs={10} md={10}/>
              <Col xs={2} md={2}>
                <Button
                  style={{marginBottom: "20px"}}
                  variant={"primary"}
                  onClick={() => this._handleCreateComment()}
                >SUBMIT
                </Button>
              </Col>
            </Row>
          </Form>
        </React.Fragment>
      );
    } else {
      return (
        <div style={{color: "white", fontSize: "20px", textAlign: "center"}}>
          <b>Please Sign In if you wish to write a comment...</b>
        </div>
      );
    }
  }

  private _handleCreateComment() {
    (async () => {
      try {
        const token = getAuthToken();
        if (token && this.state.link) {
          const newComment = await createComment(
            this.state.link.id,
            this.state.newCommentContent,
            token
          );
          const data = await getData(this.props.linkId);
          this.setState({link: data});
          this.setState({newCommentContent: ""})
          console.log('this.state.link.comments', this.state);
        }
      } catch (err) {

      }
    })();
  }
}

export const LinkDetails = withRouter(props => <LinkDetailsInternal linkId={props.match.params.link_id}/>)

async function getData(id: string) {
  const response = await fetch(`/api/v1/links/${id}`);
  const json = await response.json();
  return json as LinkData;
}

async function createComment(linkId: number, content: string, jwt: string) {
  const update = {
    linkId: linkId,
    content: content
  };
  const response = await fetch(
    "/api/v1/comments",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": jwt
      },
      body: JSON.stringify(update)
    }
  );
  const json = await response.json();
  return json;
}
