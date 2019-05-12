import React from 'react';
import {withRouter} from "react-router";
import {getAuthToken} from "../components/with_auth/with_auth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import {FormControl} from "react-bootstrap";
import Button from "react-bootstrap/Button";

interface UserDetailsItem {
  id: number;
  bio: string;
  email: string;
  pic: string;
  links: [];
  comments: [];
}

interface LinkEditorProps {
}

interface LinkEditorState {
  newTitle: string;
  newUrl: string;
}

export class LinkEditorI extends React.Component<LinkEditorProps, LinkEditorState> {
  public constructor(props: LinkEditorProps) {
    super(props);
    this.state = {
      newTitle: "",
      newUrl: ""
    }
  }

  public render() {
    const token = getAuthToken();
    console.log('token1', token);
    if (token === null) {
      return (
        <Container style={{background: "rgb(100, 109, 115, 0.7)", marginTop: "4.3em"}} fluid={true}>
          <Row>
            <Col xs={2} md={2} />
            <Col xs={8} md={8} style={{color: "white", fontSize: "20px", textAlign: "center", padding: "15px"}}>
              <b>Please Sign In if you wish to create a post...</b>
            </Col>
          </Row>
          {this._renderForm()}
        </Container>
      );
    } else {
      return (
        <Container style={{background: "rgb(100, 109, 115, 0.7)", marginTop: "4.3em"}} fluid={true}>
          <Row>
            <Col xs={2} md={2}/>
            <Col xs={6} md={6}>
            </Col>
            <Col xs={3} md={3}>

            </Col>
          </Row>
        </Container>
      );
    }
  }

  private _renderForm() {
    return (
      <React.Fragment>
        <Row>
          <Col xs={2} md={2} />
          <Col xs={8} md={8}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter new Title"
                aria-label="title"
                aria-describedby="title"
                onKeyUp={(e: any) => this._newTitle((e as any).target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={2} md={2} />
          <Col xs={8} md={8}>
            <InputGroup className="mb-3">
              <FormControl
                placeholder="Enter new URL"
                aria-label="url"
                aria-describedby="url"
                onKeyUp={(e: any) => this._newUrl((e as any).target.value)}
              />
            </InputGroup>
          </Col>
        </Row>
        <Row>
          <Col xs={9} md={9} />
          <Col xs={2} md={2}>
            <Button
              style={{marginBottom: "20px"}}
              variant={"primary"}
              onClick={() => this._handleCreateLink()}
            >SUBMIT
            </Button>
          </Col>
        </Row>
      </React.Fragment>
    )
  }

  private _newTitle(title: string) {
    this.setState({ newTitle: title });
  }

  private _newUrl(url: string) {
    this.setState({ newUrl: url });
  }

  private _handleCreateLink() {
    (async () => {
      console.log('trying to create link');
      try {
        const token = getAuthToken();
        if (token) {
          const newLink = await createLink(
            this.state.newTitle,
            this.state.newUrl,
            token
          );
          // redirect to links page
        }
      } catch (err) {
        console.log("Create link error: ", err);
      }
    })();
  }
}

export const LinkEditor = withRouter(props => <LinkEditorI {...props} />);

async function createLink(newTitle: string, newUrl: string, jwt: string) {
  const newLink = {
    title: newTitle,
    url: newUrl
  };
  const response = await fetch(
    "/api/v1/links",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": jwt
      },
      body: JSON.stringify(newLink)
    }
  );
  const json = await response.json();
  return json;
}