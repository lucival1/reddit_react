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

interface ListItem {
    userId: number;
    id: number;
    title: string;
    url: string,
}

interface CommunityInfoProps {
    items?: ListItem[];
}

interface CommunityInfoState {
}

export class CommunityInfo extends React.Component<CommunityInfoProps, CommunityInfoState> {
    public render() {
        return (
            <Row style={ CommunityInfoBoxStyle }>
                <Col>
                    <Row style={{padding: "20px"}}>
                        <Col xs={1} md={1}>
                            <i className="fas fa-hat-wizard fa-lg"></i>
                        </Col>
                        <Col xs={3} md={3}>
                            r/cct
                        </Col>
                        <Col xs={3} md={3}></Col>
                        <Col xs={3} md={3}>users</Col>
                    </Row>
                    <Row style={{padding: "20px"}}>
                        <BlockBtn
                            variant={"outline-dark"}
                            name={"Create Post"}
                        />
                    </Row>
                </Col>
            </Row>
        );
    }
}