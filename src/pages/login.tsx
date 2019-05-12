import * as React from "react";
import { withRouter } from "react-router-dom";
import { SingInOrSignUp } from "../components/sign_in_or_sign_up/sign_in_or_sign_up";
import * as H from 'history';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const loginStyle: React.CSSProperties = {
  background: "rgb(100, 109, 115, 0.7)",
  marginTop: "4.3em",
  minHeight: "800px"
};

interface LoginProps {
  history: H.History;
}

interface LoginState {
}

export class LoginInternal extends React.Component<LoginProps, LoginState> {
  public constructor(props: LoginProps) {
    super(props);
  }

  public render() {
    return (
      <Container style={loginStyle} fluid={true}>
        <Row>
          <Col xs={3} md={3}/>
          <SingInOrSignUp isSignIn={this._signInVerifier()}
                          history={this.props.history}
          />
        </Row>
      </Container>
    );
  }

  // Verify if user is signing in or signing up
  private _signInVerifier() {
    return this.props.history.location.pathname == "/sign_in";
  }
}

// withRouter pass some props that contain the history to the
// <LoginInternal> component and returns a new component named
// <Login>
export const Login = withRouter(props => <LoginInternal {...props} />);
