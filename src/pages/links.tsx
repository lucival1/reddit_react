import * as React from "react";
import {Listview} from "../components/listview/listview";
import {Link} from "react-router-dom";
import {getAuthToken} from "../components/with_auth/with_auth";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {CommunityInfo} from "../components/community_info/community_info";

interface LinksItem {
    userId: number;
    id: number;
    title: string;
    url: string,
    completed: boolean;
}

interface LinkssProps {
}

interface LinkssState {
    links: LinksItem[] | null;
}

export class Links extends React.Component<LinkssProps, LinkssState> {
    public constructor(props: LinkssProps) {
        super(props);
        this.state = {
            links: null
        };
    }

    public componentDidMount() {
        (async () => {
            const data = await getData();
            this.setState({links: data});
        })();
    }

    public render() {
        if (this.state.links === null) {
            return (
                <Container style={{background: "rgb(100, 109, 115, 0.7)", marginTop: "4.3em"}} fluid={true}>
                    <Row>
                        <Col xs={12} md={12}>
                            Loading...
                        </Col>
                    </Row>
                </Container>
            );
        } else {
            return (
                <Container style={{background: "rgb(100, 109, 115, 0.7)", marginTop: "4.3em"}} fluid={true}>
                    <Row>
                        <Col xs={2} md={2} />
                        <Col xs={6} md={6}>
                            {this._renderPrivate()}
                            {
                                this._renderSomethingPrivate()
                            }
                            <Listview items={this.state.links} />
                        </Col>
                        <Col xs={3} md={3}>
                            <CommunityInfo />
                        </Col>
                    </Row>
                </Container>
            );
        }
    }

    private _renderSomethingPrivate() {
        // getAuthToken will not trigger a re-render
        const token = getAuthToken();
        if (token) {
            return <div>{token}</div>;
        } else {
            return "";
        }
    }

    private _renderPrivate() {
        const token: string | undefined = (window as any).__token;
        if (typeof token === "string") {
            return <Link style={{color: "#ffffff"}} to="/profile">Profile</Link>
        }
    }
}

async function getData() {
    const response = await fetch("/api/v1/links/");
    const json = await response.json();
    return json as LinksItem[];
}