import * as React from "react";
import {Listview} from "../components/listview/listview";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {CommunityInfo} from "../components/community_info/community_info";
import {LinkEntry} from "../components/link_entry/link_entry";
import {FormControl, InputGroup} from "react-bootstrap";

interface LinksItem {
  id: number;
  userId: number;
  email: string;
  title: string;
  url: string;
  dateTime: string,
  commentCount: number | null;
  voteCount: number | null;
  completed: boolean;
}

interface LinkssProps {
}

interface LinkssState {
  links: LinksItem[] | null;
  query: string;
}

export class Links extends React.Component<LinkssProps, LinkssState> {
  public constructor(props: LinkssProps) {
    super(props);
    this.state = {
      links: null,
      query: ""
    };
  }

  public componentWillMount() {
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
      const filteredLinks = this.state.links.filter((link) => {
        return link.title.indexOf(this.state.query) !== -1;
      });
      return (
        <Container style={{background: "rgb(100, 109, 115, 0.7)", marginTop: "4.3em"}} fluid={true}>
          <Row style={{ paddingTop: "20px" }}>
            <Col xs={2} md={2}/>
            <Col xs={6} md={6}>
              <InputGroup className="mb-3">
                <FormControl
                  placeholder="Search"
                  aria-label="Search"
                  onKeyUp={(e: any) => this._onSearch(e.currentTarget.value)}
                />
              </InputGroup>
            </Col>
          </Row>

          <Row>
            <Col xs={2} md={2}/>
            <Col xs={6} md={6}>
              <Listview
                items={
                  filteredLinks.map((link, linkIndex) => {
                    return (
                      <LinkEntry key={linkIndex} {...link} />
                    );
                  })
                }
              />
            </Col>
            <Col xs={3} md={3}>
              <CommunityInfo/>
            </Col>
          </Row>
        </Container>
      );
    }
  }

  private _onSearch(query: string) {
    this.setState({ query: query });
  }
}

async function getData() {
  const response = await fetch("/api/v1/links/");
  const json = await response.json();
  return json as LinksItem[];
}