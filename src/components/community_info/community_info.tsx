import React from 'react';
import { NavLink } from "react-router-dom";
import { getAuthToken } from "../with_auth/with_auth";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const CommunityInfoBoxStyle: React.CSSProperties = {
  margin: "10px",
  border: "3px solid black",
  borderRadius: "5px",
  background: "rgb(247, 248, 249)",
  padding: "10px",
}

interface CommunityInfoProps {
}

interface CommunityInfoState {
  count: string;
}

export class CommunityInfo extends React.Component<CommunityInfoProps, CommunityInfoState> {
  public constructor(props: CommunityInfoProps) {
    super(props);
    this.state = {
      count: "0"
    };
  }

  public componentWillMount() {
    (async () => {
      const data = await getUserCount();
      if (data) {
        this.setState({ count: data.count });
      }
    })();
  }

  public render() {
    return (
      <Row style={CommunityInfoBoxStyle}>
        <Col>
          <Row style={{ padding: "20px" }}>
            <Col xs={1} md={1}>
              <i className="fas fa-hat-wizard fa-lg"></i>
            </Col>
            <Col xs={3} md={3}>
              r/cct
            </Col>
            <Col xs={2} md={2}></Col>
            <Col xs={4} md={4}>{this.state.count} users</Col>
          </Row>
          <Col xs={12} md={12} style={{padding: "20px"}}>
            <NavLink to={this._renderButtonPath()} style={{textDecoration: "none"}}>
              <Button
                style={{ marginBottom: "20px" }}
                variant={"outline-dark"}
                block
              ><b>Create Post</b>
              </Button>
            </NavLink>
          </Col>
        </Col>
      </Row>
    );
  }

  private _renderButtonPath() {
    const token = getAuthToken();
    return token ? "/link_editor" : "/sign_in";
  }
}

async function getUserCount() {
  const response = await fetch(`/api/v1/users/count`);
  const json = await response.json();
  return json as CommunityInfoState;
}