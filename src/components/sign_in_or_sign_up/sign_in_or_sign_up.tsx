import React from 'react';
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {setAuthToken} from "../with_auth/with_auth";
import * as H from "history";
import * as joi from "joi";
import InputGroup from "react-bootstrap/InputGroup";
import {FormControl} from "react-bootstrap";

// Styles
const ErrorStyle: React.CSSProperties = {
  color: "red",
  fontWeight: "bold",
  textAlign: "center"
}
const SingInOrSignUpStyle: React.CSSProperties = {
  margin: "100px",
  border: "3px solid black",
  borderRadius: "5px",
  background: "rgb(247, 248, 249)",
  padding: "10px",
};

//define Sign In Schema
const signInSchema = {
  email: joi.string().email().required(),
  password: joi.string().min(3).max(30).required()
};
//define Sign Up Schema
const signUpSchema = {
  email: joi.string().email().required(),
  password: joi.string().min(3).max(30).required(),
  confirmationPassword: joi.string().min(3).max(30).valid(joi.ref('password')).required()
};

interface SingInOrSignUpProps {
  isSignIn: boolean;
  history: H.History;
}

interface SingInOrSignUpState {
  email: string;
  password: string;
  confirmationPassword: string;
  error: string | null;
}

export class SingInOrSignUp extends React.Component<SingInOrSignUpProps, SingInOrSignUpState> {
  public constructor(props: SingInOrSignUpProps) {
    super(props);
    this.state = {
      email: "",
      password: "",
      confirmationPassword: "",
      error: null
    };
  }

  public render() {
    return (
      <Col xs={4} md={4} style={SingInOrSignUpStyle}>
        <Col xs={12} md={12}>
          <InputGroup className="mb-3">
            <InputGroup.Prepend>
              <InputGroup.Text id="email_input">@</InputGroup.Text>
            </InputGroup.Prepend>
            <FormControl
              placeholder="Email"
              aria-label="Email"
              aria-describedby="email_input"
              type="email"
              onKeyUp={(e: any) => this._updateEmail((e as any).target.value)}
            />
          </InputGroup>
          <InputGroup className="mb-3">
            <FormControl
              placeholder="Password"
              aria-label="Password"
              aria-describedby="password_input"
              type="password"
              onKeyUp={(e: any) => this._updatePassword((e as any).target.value)}
            />
          </InputGroup>
          {this._renderChoice()}
          {this._renderServerErrors()}
        </Col>
      </Col>
    );
  };

  private _renderChoice() {
    if (this.props.isSignIn) {
      return <div>{this._renderSignIn()}</div>;
    } else {
      return <div>{this._renderSignUp()}</div>;
    }
  }

  private _renderSignIn() {
    return (
      <span>
        <Button
          style={{}}
          variant={"outline-dark"}
          onClick={() => this._handleSignIn()}
        >Sign In
        </Button>
        {this._renderSignInValidationErrors()}
      </span>
    );
  }

  private _renderSignUp() {
    return (
      <div>
        <InputGroup className="mb-3">
          <FormControl
            placeholder="Confirm Password"
            aria-label="Password"
            aria-describedby="conf_password_input"
            type="password"
            onKeyUp={(e: any) => this._updateConfirmationPassword((e as any).target.value)}
          />
        </InputGroup>
        <Button
          style={{}}
          variant={"outline-dark"}
          onClick={() => this._handleSignUp()}
        >Sign Up
        </Button>
      </div>
    );
  }

  private _renderServerErrors() {
    if (this.state.error === null) {
      return <div></div>;
    } else {
      return <div style={{color: "red"}}>{this.state.error}</div>;
    }
  }

  // Display errors or OK on screen
  private _renderSignUpValidationErrors() {
    if (this.state.error === null) {
      return <div></div>;
    } else {
      const validateSignUp = joi.validate({
        email: this.state.email,
        password: this.state.password,
        confirmationPassword: this.state.confirmationPassword
      }, signUpSchema);

      if (validateSignUp.error) {
        return (
          <div style={ErrorStyle}>
            {validateSignUp.error.details.map((d, index) => <div key={index}>{d.message}</div>)}
          </div>
        );
      } else {
        return <div>OK!</div>;
      }
    }
  }

  // Display errors or OK on screen
  private _renderSignInValidationErrors() {
    if (this.state.error === null) {
      return <div></div>;
    } else {
      const validateSignIn = joi.validate({
        email: this.state.email,
        password: this.state.password
      }, signInSchema);
      const validateSignUp = joi.validate({
        email: this.state.email,
        password: this.state.password,
        confirmationPassword: this.state.confirmationPassword
      }, signUpSchema);

      if (validateSignIn.error) {
        return (
          <div style={ErrorStyle}>
            {validateSignIn.error.details.map((d, index) => <div key={index}>{d.message}</div>)}
          </div>
        );
      } else if (validateSignUp.error) {
        return (
          <div style={ErrorStyle}>
            {validateSignUp.error.details.map((d, index) => <div key={index}>{d.message}</div>)}
          </div>
        );
      } else {
        return <div>OK!</div>;
      }
    }
  }

  // Update the state (email) on keyup
  private _updateEmail(email: string) {
    this.setState({email: email});
  }

  // Update the state (password) on keyup
  private _updatePassword(password: string) {
    this.setState({password: password});
  }

  // Update the state (password) on keyup
  private _updateConfirmationPassword(confirmationPassword: string) {
    this.setState({confirmationPassword: confirmationPassword});
  }

  // Send HTTP request on click
  private _handleSignIn() {
    (async () => {
      try {
        const token = await getToken(this.state.email, this.state.password);
        // Reset error
        this.setState({error: null});
        // Save token in window object
        // (window as any).__token = token;
        setAuthToken(token);
        // Redirect to home page
        this.props.history.push("/");
      } catch (err) {
        console.log('err', err);
        this.setState({error: err.error});
      }
    })();
  }

  // Send HTTP request on click
  private _handleSignUp() {
    const validateSignUp = joi.validate({
      email: this.state.email,
      password: this.state.password,
      confirmationPassword: this.state.confirmationPassword
    }, signUpSchema);

    if (validateSignUp.error === null) {
      (async () => {
        try {
          await createNewUser(this.state.email, this.state.password);
          // Reset error
          this.setState({error: null});
          // Redirect to home page
          this.props.history.push("/sign_in");
        } catch (err) {
          console.log('err', err);
          this.setState({error: err.error});
        }
      })();
    } else {
      return;
    }
  }
}

async function getToken(email: string, password: string) {
  return new Promise<string>(function (resolve, reject) {
    (async () => {
      const data = {
        email: email,
        password: password
      };
      const response = await fetch(
        "/api/v1/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
      const json = await response.json();
      if (response.status === 200) {
        resolve(json.token);
      } else {
        reject(json);
      }
    })();
  });
}

async function createNewUser(email: string, password: string) {
  return new Promise<string>(function (resolve, reject) {
    (async () => {
      const data = {
        email: email,
        password: password
      };
      const response = await fetch(
        "/api/v1/users",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }
      );
      const json = await response.json();
      if (response.status === 200) {
        resolve(json.ok);
      } else {
        reject(json);
      }
    })();
  });
}