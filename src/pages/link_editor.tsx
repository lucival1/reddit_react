import React from 'react';
import { withRouter } from "react-router";
import { getAuthToken } from "../components/with_auth/with_auth";
import { NavLink } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import InputGroup from "react-bootstrap/InputGroup";
import FormControl from "react-bootstrap/FormControl";
import Button from "react-bootstrap/Button";

const linkEditorStyle: React.CSSProperties = {
  background: "rgb(100, 109, 115, 0.7)",
  marginTop: "4.3em",
  minHeight: "800px"
};

const linkEditorBoxStyle: React.CSSProperties = {
  border: "black 3px solid",
  borderRadius: "5px",
  background: "rgb(247, 248, 249)"

};

const linkEditorSignInStyle: React.CSSProperties = {
  marginTop: "50px",
  color: "white",
  fontSize: "20px",
  textAlign: "center",
  padding: "15px"
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
    if (token === null) {
      return (
        <Container style={linkEditorStyle} fluid={true}>
          <Row>
            <Col xs={2} md={2}/>
            <Col xs={8} md={8} style={linkEditorSignInStyle}>
              <b>Please Sign In if you wish to create a post...</b>
            </Col>
          </Row>
        </Container>
      );
    } else {
      return (
        <Container style={linkEditorStyle} fluid={true}>
          <Row>
            <Col xs={2} md={2}/>
            <Col xs={6} md={6} style={{ margin: "50px" }}>
              {this._renderForm()}
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
          <Col xs={2} md={2}/>
          <Col xs={9} md={9} style={linkEditorBoxStyle}>
            <Row>
              <h3 style={{ padding: "10px 15px 5px 15px" }}>CREATE A NEW LINK</h3>
              <InputGroup className="mb-3" style={{ padding: "5px 15px 5px 15px" }}>
                <FormControl
                  placeholder="Enter new Title"
                  aria-label="title"
                  aria-describedby="title"
                  onKeyUp={(e: any) => this._newTitle((e as any).target.value)}
                />
              </InputGroup>
            </Row>
            <Row>
              <InputGroup className="mb-3" style={{ padding: "5px 15px 5px 15px" }}>
                <FormControl
                  placeholder="Enter new URL"
                  aria-label="url"
                  aria-describedby="url"
                  as="textarea"
                  onKeyUp={(e: any) => this._newUrl((e as any).target.value)}
                />
              </InputGroup>
            </Row>
            <Row>
              <Col xs={9} md={9}/>
              <Col xs={2} md={2}>
                <NavLink to="/">
                  <Button
                    style={{ marginBottom: "20px" }}
                    variant={"primary"}
                    onClick={() => this._handleCreateLink()}
                  >SUBMIT
                  </Button>
                </NavLink>
              </Col>
            </Row>
          </Col>
        </Row>
      </React.Fragment>
    )
  }

  private _newTitle(title: string) {
    this.setState({newTitle: title});
  }

  private _newUrl(url: string) {
    this.setState({newUrl: url});
  }

  private _handleCreateLink() {
    (async () => {
      try {
        const token = getAuthToken();
        const newTitle = this.state.newTitle;
        const newUrl = this.state.newUrl;
        if (token && newTitle && newUrl) {
          await createLink(
            newTitle,
            newUrl,
            token
          );
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