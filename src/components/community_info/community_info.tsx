import React from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {BlockBtn} from "../buttons/block_btn";

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
  public constructor(state: CommunityInfoState) {
    super(state);
    this.state = {
      count: "0"
    };
  }

  public componentWillMount() {
    (async () => {
      const data = await getUserCount();
      this.setState({count: data.count});
    })();
  }

  public render() {
    return (
      <Row style={CommunityInfoBoxStyle}>
        <Col>
          <Row style={{padding: "20px"}}>
            <Col xs={1} md={1}>
              <i className="fas fa-hat-wizard fa-lg"></i>
            </Col>
            <Col xs={3} md={3}>
              r/cct
            </Col>
            <Col xs={2} md={2}></Col>
            <Col xs={4} md={4}>{this.state.count} users</Col>
          </Row>
          <Row style={{padding: "20px"}}>
            <BlockBtn
              variant={"outline-dark"}
              name={"Create Post"}
              path={"/link_editor"}
            />
          </Row>
        </Col>
      </Row>
    );
  }
}

async function getUserCount() {
  const response = await fetch(`/api/v1/users/count`);
  const json = await response.json();
  return json as CommunityInfoState;
}